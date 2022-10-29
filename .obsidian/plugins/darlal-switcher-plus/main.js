'use strict';

var obsidian = require('obsidian');

var PathDisplayFormat;
(function (PathDisplayFormat) {
    PathDisplayFormat[PathDisplayFormat["None"] = 0] = "None";
    PathDisplayFormat[PathDisplayFormat["Full"] = 1] = "Full";
    PathDisplayFormat[PathDisplayFormat["FolderOnly"] = 2] = "FolderOnly";
    PathDisplayFormat[PathDisplayFormat["FolderWithFilename"] = 3] = "FolderWithFilename";
    PathDisplayFormat[PathDisplayFormat["FolderPathFilenameOptional"] = 4] = "FolderPathFilenameOptional";
})(PathDisplayFormat || (PathDisplayFormat = {}));
var Mode;
(function (Mode) {
    Mode[Mode["Standard"] = 1] = "Standard";
    Mode[Mode["EditorList"] = 2] = "EditorList";
    Mode[Mode["SymbolList"] = 4] = "SymbolList";
    Mode[Mode["WorkspaceList"] = 8] = "WorkspaceList";
    Mode[Mode["HeadingsList"] = 16] = "HeadingsList";
    Mode[Mode["StarredList"] = 32] = "StarredList";
    Mode[Mode["CommandList"] = 64] = "CommandList";
    Mode[Mode["RelatedItemsList"] = 128] = "RelatedItemsList";
})(Mode || (Mode = {}));
var SymbolType;
(function (SymbolType) {
    SymbolType[SymbolType["Link"] = 1] = "Link";
    SymbolType[SymbolType["Embed"] = 2] = "Embed";
    SymbolType[SymbolType["Tag"] = 4] = "Tag";
    SymbolType[SymbolType["Heading"] = 8] = "Heading";
    SymbolType[SymbolType["Callout"] = 16] = "Callout";
})(SymbolType || (SymbolType = {}));
var LinkType;
(function (LinkType) {
    LinkType[LinkType["None"] = 0] = "None";
    LinkType[LinkType["Normal"] = 1] = "Normal";
    LinkType[LinkType["Heading"] = 2] = "Heading";
    LinkType[LinkType["Block"] = 4] = "Block";
})(LinkType || (LinkType = {}));
const SymbolIndicators = {};
SymbolIndicators[SymbolType.Link] = '🔗';
SymbolIndicators[SymbolType.Embed] = '!';
SymbolIndicators[SymbolType.Tag] = '#';
SymbolIndicators[SymbolType.Heading] = 'H';
const HeadingIndicators = {};
HeadingIndicators[1] = 'H₁';
HeadingIndicators[2] = 'H₂';
HeadingIndicators[3] = 'H₃';
HeadingIndicators[4] = 'H₄';
HeadingIndicators[5] = 'H₅';
HeadingIndicators[6] = 'H₆';
var SuggestionType;
(function (SuggestionType) {
    SuggestionType["EditorList"] = "editorList";
    SuggestionType["SymbolList"] = "symbolList";
    SuggestionType["WorkspaceList"] = "workspaceList";
    SuggestionType["HeadingsList"] = "headingsList";
    SuggestionType["StarredList"] = "starredList";
    SuggestionType["CommandList"] = "commandList";
    SuggestionType["RelatedItemsList"] = "relatedItemsList";
    SuggestionType["File"] = "file";
    SuggestionType["Alias"] = "alias";
    SuggestionType["Unresolved"] = "unresolved";
})(SuggestionType || (SuggestionType = {}));
var MatchType;
(function (MatchType) {
    MatchType[MatchType["None"] = 0] = "None";
    MatchType[MatchType["Primary"] = 1] = "Primary";
    MatchType[MatchType["Basename"] = 2] = "Basename";
    MatchType[MatchType["ParentPath"] = 3] = "ParentPath";
})(MatchType || (MatchType = {}));
var RelationType;
(function (RelationType) {
    RelationType["DiskLocation"] = "disk-location";
    RelationType["Backlink"] = "backlink";
})(RelationType || (RelationType = {}));

function isOfType(obj, discriminator, val) {
    let ret = false;
    if (obj && obj[discriminator] !== undefined) {
        ret = true;
        if (val !== undefined && val !== obj[discriminator]) {
            ret = false;
        }
    }
    return ret;
}
function isSymbolSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.SymbolList);
}
function isEditorSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.EditorList);
}
function isWorkspaceSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.WorkspaceList);
}
function isHeadingSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.HeadingsList);
}
function isCommandSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.CommandList);
}
function isFileSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.File);
}
function isAliasSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.Alias);
}
function isUnresolvedSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.Unresolved);
}
function isSystemSuggestion(obj) {
    return isFileSuggestion(obj) || isUnresolvedSuggestion(obj) || isAliasSuggestion(obj);
}
function isExSuggestion(sugg) {
    return sugg && !isSystemSuggestion(sugg);
}
function isHeadingCache(obj) {
    return isOfType(obj, 'level');
}
function isTagCache(obj) {
    return isOfType(obj, 'tag');
}
function isCalloutCache(obj) {
    return isOfType(obj, 'type', 'callout');
}
function isTFile(obj) {
    return isOfType(obj, 'extension');
}
function isFileStarredItem(obj) {
    return isOfType(obj, 'type', 'file');
}
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getInternalPluginById(app, id) {
    return app?.internalPlugins?.getPluginById(id);
}
function getSystemSwitcherInstance(app) {
    const plugin = getInternalPluginById(app, 'switcher');
    return plugin?.instance;
}
function stripMDExtensionFromPath(file) {
    let retVal = null;
    if (file) {
        const { path } = file;
        retVal = path;
        if (file.extension === 'md') {
            const index = path.lastIndexOf('.');
            if (index !== -1 && index !== path.length - 1 && index !== 0) {
                retVal = path.slice(0, index);
            }
        }
    }
    return retVal;
}
function filenameFromPath(path) {
    let retVal = null;
    if (path) {
        const index = path.lastIndexOf('/');
        retVal = index === -1 ? path : path.slice(index + 1);
    }
    return retVal;
}
function matcherFnForRegExList(regExStrings) {
    regExStrings = regExStrings ?? [];
    const regExList = [];
    for (const str of regExStrings) {
        try {
            const rx = new RegExp(str);
            regExList.push(rx);
        }
        catch (err) {
            console.log(`Switcher++: error creating RegExp from string: ${str}`, err);
        }
    }
    const isMatchFn = (input) => {
        for (const rx of regExList) {
            if (rx.test(input)) {
                return true;
            }
        }
        return false;
    };
    return isMatchFn;
}
function getLinkType(linkCache) {
    let type = LinkType.None;
    if (linkCache) {
        // remove the display text before trying to parse the link target
        const linkStr = linkCache.link.split('|')[0];
        if (linkStr.includes('#^')) {
            type = LinkType.Block;
        }
        else if (linkStr.includes('#')) {
            type = LinkType.Heading;
        }
        else {
            type = LinkType.Normal;
        }
    }
    return type;
}

class FrontMatterParser {
    static getAliases(frontMatter) {
        let aliases = [];
        if (frontMatter) {
            aliases = FrontMatterParser.getValueForKey(frontMatter, /^alias(es)?$/i);
        }
        return aliases;
    }
    static getValueForKey(frontMatter, keyPattern) {
        const retVal = [];
        const fmKeys = Object.keys(frontMatter);
        const key = fmKeys.find((val) => keyPattern.test(val));
        if (key) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            let value = frontMatter[key];
            if (typeof value === 'string') {
                value = value.split(',');
            }
            if (Array.isArray(value)) {
                value.forEach((val) => {
                    if (typeof val === 'string') {
                        retVal.push(val.trim());
                    }
                });
            }
        }
        return retVal;
    }
}

class SwitcherPlusSettings {
    constructor(plugin) {
        this.plugin = plugin;
        this.data = SwitcherPlusSettings.defaults;
    }
    static get defaults() {
        const enabledSymbolTypes = {};
        enabledSymbolTypes[SymbolType.Link] = true;
        enabledSymbolTypes[SymbolType.Embed] = true;
        enabledSymbolTypes[SymbolType.Tag] = true;
        enabledSymbolTypes[SymbolType.Heading] = true;
        enabledSymbolTypes[SymbolType.Callout] = true;
        return {
            onOpenPreferNewTab: true,
            alwaysNewTabForSymbols: false,
            useActiveTabForSymbolsOnMobile: false,
            symbolsInLineOrder: true,
            editorListCommand: 'edt ',
            symbolListCommand: '@',
            workspaceListCommand: '+',
            headingsListCommand: '#',
            starredListCommand: "'",
            commandListCommand: '>',
            relatedItemsListCommand: '~',
            strictHeadingsOnly: false,
            searchAllHeadings: true,
            excludeViewTypes: ['empty'],
            referenceViews: ['backlink', 'localgraph', 'outgoing-link', 'outline'],
            limit: 50,
            includeSidePanelViewTypes: ['backlink', 'image', 'markdown', 'pdf'],
            enabledSymbolTypes,
            selectNearestHeading: true,
            excludeFolders: [],
            excludeLinkSubTypes: 0,
            excludeRelatedFolders: [''],
            excludeOpenRelatedFiles: false,
            excludeObsidianIgnoredFiles: false,
            shouldSearchFilenames: false,
            pathDisplayFormat: PathDisplayFormat.FolderWithFilename,
            hidePathIfRoot: true,
            enabledRelatedItems: Object.values(RelationType),
        };
    }
    get builtInSystemOptions() {
        return getSystemSwitcherInstance(this.plugin.app)?.options;
    }
    get showAllFileTypes() {
        // forward to core switcher settings
        return this.builtInSystemOptions?.showAllFileTypes;
    }
    get showAttachments() {
        // forward to core switcher settings
        return this.builtInSystemOptions?.showAttachments;
    }
    get showExistingOnly() {
        // forward to core switcher settings
        return this.builtInSystemOptions?.showExistingOnly;
    }
    get onOpenPreferNewTab() {
        return this.data.onOpenPreferNewTab;
    }
    set onOpenPreferNewTab(value) {
        this.data.onOpenPreferNewTab = value;
    }
    get alwaysNewTabForSymbols() {
        return this.data.alwaysNewTabForSymbols;
    }
    set alwaysNewTabForSymbols(value) {
        this.data.alwaysNewTabForSymbols = value;
    }
    get useActiveTabForSymbolsOnMobile() {
        return this.data.useActiveTabForSymbolsOnMobile;
    }
    set useActiveTabForSymbolsOnMobile(value) {
        this.data.useActiveTabForSymbolsOnMobile = value;
    }
    get symbolsInLineOrder() {
        return this.data.symbolsInLineOrder;
    }
    set symbolsInLineOrder(value) {
        this.data.symbolsInLineOrder = value;
    }
    get editorListPlaceholderText() {
        return SwitcherPlusSettings.defaults.editorListCommand;
    }
    get editorListCommand() {
        return this.data.editorListCommand;
    }
    set editorListCommand(value) {
        this.data.editorListCommand = value;
    }
    get symbolListPlaceholderText() {
        return SwitcherPlusSettings.defaults.symbolListCommand;
    }
    get symbolListCommand() {
        return this.data.symbolListCommand;
    }
    set symbolListCommand(value) {
        this.data.symbolListCommand = value;
    }
    get workspaceListCommand() {
        return this.data.workspaceListCommand;
    }
    set workspaceListCommand(value) {
        this.data.workspaceListCommand = value;
    }
    get workspaceListPlaceholderText() {
        return SwitcherPlusSettings.defaults.workspaceListCommand;
    }
    get headingsListCommand() {
        return this.data.headingsListCommand;
    }
    set headingsListCommand(value) {
        this.data.headingsListCommand = value;
    }
    get headingsListPlaceholderText() {
        return SwitcherPlusSettings.defaults.headingsListCommand;
    }
    get starredListCommand() {
        return this.data.starredListCommand;
    }
    set starredListCommand(value) {
        this.data.starredListCommand = value;
    }
    get starredListPlaceholderText() {
        return SwitcherPlusSettings.defaults.starredListCommand;
    }
    get commandListCommand() {
        return this.data.commandListCommand;
    }
    set commandListCommand(value) {
        this.data.commandListCommand = value;
    }
    get commandListPlaceholderText() {
        return SwitcherPlusSettings.defaults.commandListCommand;
    }
    get relatedItemsListCommand() {
        return this.data.relatedItemsListCommand;
    }
    set relatedItemsListCommand(value) {
        this.data.relatedItemsListCommand = value;
    }
    get relatedItemsListPlaceholderText() {
        return SwitcherPlusSettings.defaults.relatedItemsListCommand;
    }
    get strictHeadingsOnly() {
        return this.data.strictHeadingsOnly;
    }
    set strictHeadingsOnly(value) {
        this.data.strictHeadingsOnly = value;
    }
    get searchAllHeadings() {
        return this.data.searchAllHeadings;
    }
    set searchAllHeadings(value) {
        this.data.searchAllHeadings = value;
    }
    get excludeViewTypes() {
        return this.data.excludeViewTypes;
    }
    get referenceViews() {
        return this.data.referenceViews;
    }
    get limit() {
        return this.data.limit;
    }
    set limit(value) {
        this.data.limit = value;
    }
    get includeSidePanelViewTypes() {
        return this.data.includeSidePanelViewTypes;
    }
    set includeSidePanelViewTypes(value) {
        // remove any duplicates before storing
        this.data.includeSidePanelViewTypes = [...new Set(value)];
    }
    get includeSidePanelViewTypesPlaceholder() {
        return SwitcherPlusSettings.defaults.includeSidePanelViewTypes.join('\n');
    }
    get selectNearestHeading() {
        return this.data.selectNearestHeading;
    }
    set selectNearestHeading(value) {
        this.data.selectNearestHeading = value;
    }
    get excludeFolders() {
        return this.data.excludeFolders;
    }
    set excludeFolders(value) {
        // remove any duplicates before storing
        this.data.excludeFolders = [...new Set(value)];
    }
    get excludeLinkSubTypes() {
        return this.data.excludeLinkSubTypes;
    }
    set excludeLinkSubTypes(value) {
        this.data.excludeLinkSubTypes = value;
    }
    get excludeRelatedFolders() {
        return this.data.excludeRelatedFolders;
    }
    set excludeRelatedFolders(value) {
        this.data.excludeRelatedFolders = [...new Set(value)];
    }
    get excludeOpenRelatedFiles() {
        return this.data.excludeOpenRelatedFiles;
    }
    set excludeOpenRelatedFiles(value) {
        this.data.excludeOpenRelatedFiles = value;
    }
    get excludeObsidianIgnoredFiles() {
        return this.data.excludeObsidianIgnoredFiles;
    }
    set excludeObsidianIgnoredFiles(value) {
        this.data.excludeObsidianIgnoredFiles = value;
    }
    get shouldSearchFilenames() {
        return this.data.shouldSearchFilenames;
    }
    set shouldSearchFilenames(value) {
        this.data.shouldSearchFilenames = value;
    }
    get pathDisplayFormat() {
        return this.data.pathDisplayFormat;
    }
    set pathDisplayFormat(value) {
        this.data.pathDisplayFormat = value;
    }
    get hidePathIfRoot() {
        return this.data.hidePathIfRoot;
    }
    set hidePathIfRoot(value) {
        this.data.hidePathIfRoot = value;
    }
    get enabledRelatedItems() {
        return this.data.enabledRelatedItems;
    }
    set enabledRelatedItems(value) {
        this.data.enabledRelatedItems = value;
    }
    async loadSettings() {
        const copy = (source, target, keys) => {
            for (const key of keys) {
                if (key in source) {
                    target[key] = source[key];
                }
            }
        };
        try {
            const savedData = (await this.plugin?.loadData());
            if (savedData) {
                const keys = Object.keys(SwitcherPlusSettings.defaults);
                copy(savedData, this.data, keys);
            }
        }
        catch (err) {
            console.log('Switcher++: error loading settings, using defaults. ', err);
        }
    }
    async saveSettings() {
        const { plugin, data } = this;
        await plugin?.saveData(data);
    }
    save() {
        this.saveSettings().catch((e) => {
            console.log('Switcher++: error saving changes to settings', e);
        });
    }
    isSymbolTypeEnabled(symbol) {
        const { enabledSymbolTypes } = this.data;
        let value = SwitcherPlusSettings.defaults.enabledSymbolTypes[symbol];
        if (Object.prototype.hasOwnProperty.call(enabledSymbolTypes, symbol)) {
            value = enabledSymbolTypes[symbol];
        }
        return value;
    }
    setSymbolTypeEnabled(symbol, isEnabled) {
        this.data.enabledSymbolTypes[symbol] = isEnabled;
    }
}

class SettingsTabSection {
    constructor(app, mainSettingsTab, config) {
        this.app = app;
        this.mainSettingsTab = mainSettingsTab;
        this.config = config;
    }
    /**
     * Creates a new Setting with the given name and description.
     * @param  {HTMLElement} containerEl
     * @param  {string} name
     * @param  {string} desc
     * @returns Setting
     */
    createSetting(containerEl, name, desc) {
        const setting = new obsidian.Setting(containerEl);
        setting.setName(name);
        setting.setDesc(desc);
        return setting;
    }
    /**
     * Create section title elements and divider.
     * @param  {HTMLElement} containerEl
     * @param  {string} title
     * @param  {string} desc?
     * @returns Setting
     */
    addSectionTitle(containerEl, title, desc = '') {
        const setting = this.createSetting(containerEl, title, desc);
        setting.setHeading();
        return setting;
    }
    /**
     * Creates a HTMLInput element setting.
     * @param  {HTMLElement} containerEl The element to attach the setting to.
     * @param  {string} name
     * @param  {string} desc
     * @param  {string} initialValue
     * @param  {StringTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @param  {string} placeholderText?
     * @returns Setting
     */
    addTextSetting(containerEl, name, desc, initialValue, configStorageKey, placeholderText) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addText((comp) => {
            comp.setPlaceholder(placeholderText);
            comp.setValue(initialValue);
            comp.onChange((rawValue) => {
                const value = rawValue.length ? rawValue : initialValue;
                this.saveChangesToConfig(configStorageKey, value);
            });
        });
        return setting;
    }
    /**
     * Create a Checkbox element setting.
     * @param  {HTMLElement} containerEl The element to attach the setting to.
     * @param  {string} name
     * @param  {string} desc
     * @param  {boolean} initialValue
     * @param  {BooleanTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored. This can safely be set to null if the onChange handler is provided.
     * @param  {(value:string,config:SwitcherPlusSettings)=>void} onChange? optional callback to invoke instead of using configStorageKey
     * @returns Setting
     */
    addToggleSetting(containerEl, name, desc, initialValue, configStorageKey, onChange) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addToggle((comp) => {
            comp.setValue(initialValue);
            comp.onChange((value) => {
                if (onChange) {
                    onChange(value, this.config);
                }
                else {
                    this.saveChangesToConfig(configStorageKey, value);
                }
            });
        });
        return setting;
    }
    /**
     * Create a TextArea element setting.
     * @param  {HTMLElement} containerEl The element to attach the setting to.
     * @param  {string} name
     * @param  {string} desc
     * @param  {string} initialValue
     * @param  {ListTypedConfigKey|StringTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @param  {string} placeholderText?
     * @returns Setting
     */
    addTextAreaSetting(containerEl, name, desc, initialValue, configStorageKey, placeholderText) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addTextArea((comp) => {
            comp.setPlaceholder(placeholderText);
            comp.setValue(initialValue);
            comp.onChange((rawValue) => {
                const value = rawValue.length ? rawValue : initialValue;
                const isArray = Array.isArray(this.config[configStorageKey]);
                this.saveChangesToConfig(configStorageKey, isArray ? value.split('\n') : value);
            });
        });
        return setting;
    }
    /**
     * Add a dropdown list setting
     * @param  {HTMLElement} containerEl
     * @param  {string} name
     * @param  {string} desc
     * @param  {string} initialValue option value that is initially selected
     * @param  {Record<string, string>} options
     * @param  {StringTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored. This can safely be set to null if the onChange handler is provided.
     * @param  {(rawValue:string,config:SwitcherPlusSettings)=>void} onChange? optional callback to invoke instead of using configStorageKey
     * @returns Setting
     */
    addDropdownSetting(containerEl, name, desc, initialValue, options, configStorageKey, onChange) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addDropdown((comp) => {
            comp.addOptions(options);
            comp.setValue(initialValue);
            comp.onChange((rawValue) => {
                if (onChange) {
                    onChange(rawValue, this.config);
                }
                else {
                    this.saveChangesToConfig(configStorageKey, rawValue);
                }
            });
        });
        return setting;
    }
    /**
     * Updates the internal SwitcherPlusSettings configStorageKey with value, and writes it to disk.
     * @param  {K} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @param  {SwitcherPlusSettings[K]} value
     * @returns void
     */
    saveChangesToConfig(configStorageKey, value) {
        if (configStorageKey) {
            const { config } = this;
            config[configStorageKey] = value;
            config.save();
        }
    }
}

class StarredSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Starred List Mode Settings');
        this.addTextSetting(containerEl, 'Starred list mode trigger', 'Character that will trigger starred list mode in the switcher', config.starredListCommand, 'starredListCommand', config.starredListPlaceholderText);
    }
}

class CommandListSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Command List Mode Settings');
        this.addTextSetting(containerEl, 'Command list mode trigger', 'Character that will trigger command list mode in the switcher', config.commandListCommand, 'commandListCommand', config.commandListPlaceholderText);
    }
}

class RelatedItemsSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Related Items List Mode Settings');
        this.addTextSetting(containerEl, 'Related Items list mode trigger', 'Character that will trigger related items list mode in the switcher', config.relatedItemsListCommand, 'relatedItemsListCommand', config.relatedItemsListPlaceholderText);
        this.showEnabledRelatedItems(containerEl, config);
        this.addToggleSetting(containerEl, 'Exclude open files', 'Enable, related files which are already open will not be displayed in the list. Disabled, All related files will be displayed in the list.', config.excludeOpenRelatedFiles, 'excludeOpenRelatedFiles');
    }
    showEnabledRelatedItems(containerEl, config) {
        const relationTypes = Object.values(RelationType).sort();
        const relationTypesStr = relationTypes.join(', ');
        const desc = `The types of related items to show in the list. Add one type per line. Available types: ${relationTypesStr}`;
        this.createSetting(containerEl, 'Show related item types', desc).addTextArea((textArea) => {
            textArea.setValue(config.enabledRelatedItems.join('\n'));
            textArea.inputEl.addEventListener('focusout', () => {
                const values = textArea
                    .getValue()
                    .split('\n')
                    .map((v) => v.trim())
                    .filter((v) => v.length > 0);
                const invalidValues = [...new Set(values)].filter((v) => !relationTypes.includes(v));
                if (invalidValues?.length) {
                    this.showErrorPopup(invalidValues.join('<br/>'), relationTypesStr);
                }
                else {
                    config.enabledRelatedItems = values;
                    config.save();
                }
            });
        });
    }
    showErrorPopup(invalidTypes, relationTypes) {
        const popup = new obsidian.Modal(this.app);
        popup.titleEl.setText('Invalid related item type');
        popup.contentEl.innerHTML = `Changes not saved. Available relation types are: ${relationTypes}. The following types are invalid:<br/><br/>${invalidTypes}`;
        popup.open();
    }
}

class GeneralSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        this.addSectionTitle(containerEl, 'General Settings');
        this.addToggleSetting(containerEl, 'Default to open in new tab', 'When enabled, navigating to un-opened files will open a new editor tab whenever possible (as if cmd/ctrl were held). When the file is already open, the existing tab will be activated. This overrides all other tab settings.', this.config.onOpenPreferNewTab, 'onOpenPreferNewTab');
        this.setPathDisplayFormat(containerEl, this.config);
    }
    setPathDisplayFormat(containerEl, config) {
        const options = {};
        options[PathDisplayFormat.None.toString()] = 'Hide path';
        options[PathDisplayFormat.Full.toString()] = 'Full path';
        options[PathDisplayFormat.FolderOnly.toString()] = 'Only parent folder';
        options[PathDisplayFormat.FolderWithFilename.toString()] = 'Parent folder & filename';
        options[PathDisplayFormat.FolderPathFilenameOptional.toString()] =
            'Parent folder path (filename optional)';
        this.addDropdownSetting(containerEl, 'Preferred file path display format', 'The preferred way to display file paths in suggestions', config.pathDisplayFormat.toString(), options, null, (rawValue, config) => {
            config.pathDisplayFormat = Number(rawValue);
            config.save();
        });
    }
}

class WorkspaceSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Workspace List Mode Settings');
        this.addTextSetting(containerEl, 'Workspace list mode trigger', 'Character that will trigger workspace list mode in the switcher', config.workspaceListCommand, 'workspaceListCommand', config.workspaceListPlaceholderText);
    }
}

class EditorSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Editor List Mode Settings');
        this.addTextSetting(containerEl, 'Editor list mode trigger', 'Character that will trigger editor list mode in the switcher', config.editorListCommand, 'editorListCommand', config.editorListPlaceholderText);
        this.setIncludeSidePanelViews(containerEl, config);
    }
    setIncludeSidePanelViews(containerEl, config) {
        const viewsListing = Object.keys(this.app.viewRegistry.viewByType).sort().join(' ');
        const desc = `When in Editor list mode, show the following view types from the side panels. Add one view type per line. Available view types: ${viewsListing}`;
        this.addTextAreaSetting(containerEl, 'Include side panel views', desc, config.includeSidePanelViewTypes.join('\n'), 'includeSidePanelViewTypes', config.includeSidePanelViewTypesPlaceholder);
    }
}

class HeadingsSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Headings List Mode Settings');
        this.addTextSetting(containerEl, 'Headings list mode trigger', 'Character that will trigger headings list mode in the switcher', config.headingsListCommand, 'headingsListCommand', config.headingsListPlaceholderText);
        this.addToggleSetting(containerEl, 'Show headings only', 'Enabled, strictly search through only the headings contained in the file. Note: this setting overrides the "Show existing only", and "Search filenames" settings. Disabled, fallback to searching against the filename when there is not a match in the first H1 contained in the file. This will also allow searching through filenames, Aliases, and Unresolved links to be enabled.', config.strictHeadingsOnly, 'strictHeadingsOnly');
        this.addToggleSetting(containerEl, 'Search all headings', 'Enabled, search through all headings contained in each file. Disabled, only search through the first H1 in each file.', config.searchAllHeadings, 'searchAllHeadings');
        this.addToggleSetting(containerEl, 'Search filenames', "Enabled, search and show suggestions for filenames. Disabled, Don't search through filenames (except for fallback searches)", config.shouldSearchFilenames, 'shouldSearchFilenames');
        this.setExcludeFolders(containerEl, config);
        this.addToggleSetting(containerEl, 'Hide Obsidian "Excluded files"', 'Enabled, do not display suggestions for files that are in Obsidian\'s "Options > Files & Links > Excluded files" list. Disabled, suggestions for those files will be displayed but downranked.', config.excludeObsidianIgnoredFiles, 'excludeObsidianIgnoredFiles');
    }
    setExcludeFolders(containerEl, config) {
        const settingName = 'Exclude folders';
        this.createSetting(containerEl, settingName, 'When in Headings list mode, folder path that match any regex listed here will not be searched for suggestions. Path should start from the Vault Root. Add one path per line.').addTextArea((textArea) => {
            textArea.setValue(config.excludeFolders.join('\n'));
            textArea.inputEl.addEventListener('blur', () => {
                const excludes = textArea
                    .getValue()
                    .split('\n')
                    .filter((v) => v.length > 0);
                if (this.validateExcludeFolderList(settingName, excludes)) {
                    config.excludeFolders = excludes;
                    config.save();
                }
            });
        });
    }
    validateExcludeFolderList(settingName, excludes) {
        let isValid = true;
        let failedMsg = '';
        for (const str of excludes) {
            try {
                new RegExp(str);
            }
            catch (err) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                failedMsg += `<span class="qsp-warning">${str}</span><br/>${err}<br/><br/>`;
                isValid = false;
            }
        }
        if (!isValid) {
            const popup = new obsidian.Modal(this.app);
            popup.titleEl.setText(settingName);
            popup.contentEl.innerHTML = `Changes not saved. The following regex contain errors:<br/><br/>${failedMsg}`;
            popup.open();
        }
        return isValid;
    }
}

class SymbolSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Symbol List Mode Settings');
        this.addTextSetting(containerEl, 'Symbol list mode trigger', 'Character that will trigger symbol list mode in the switcher', config.symbolListCommand, 'symbolListCommand', config.symbolListPlaceholderText);
        this.addToggleSetting(containerEl, 'List symbols as indented outline', 'Enabled, symbols will be displayed in the (line) order they appear in the source text, indented under any preceding heading. Disabled, symbols will be grouped by type: Headings, Tags, Links, Embeds.', config.symbolsInLineOrder, 'symbolsInLineOrder');
        this.addToggleSetting(containerEl, 'Open Symbols in new tab', 'Enabled, always open a new tab when navigating to Symbols. Disabled, navigate in an already open tab (if one exists)', config.alwaysNewTabForSymbols, 'alwaysNewTabForSymbols');
        this.addToggleSetting(containerEl, 'Open Symbols in active tab on mobile devices', 'Enabled, navigate to the target file and symbol in the active editor tab. Disabled, open a new tab when navigating to Symbols, even on mobile devices.', config.useActiveTabForSymbolsOnMobile, 'useActiveTabForSymbolsOnMobile');
        this.addToggleSetting(containerEl, 'Auto-select nearest heading', 'Enabled, in an unfiltered symbol list, select the closest preceding Heading to the current cursor position. Disabled, the first symbol in the list is selected.', config.selectNearestHeading, 'selectNearestHeading');
        this.showEnableSymbolTypesToggle(containerEl, config);
        this.showEnableLinksToggle(containerEl, config);
    }
    showEnableSymbolTypesToggle(containerEl, config) {
        const allowedSymbols = [
            ['Show Headings', SymbolType.Heading],
            ['Show Tags', SymbolType.Tag],
            ['Show Embeds', SymbolType.Embed],
            ['Show Callouts', SymbolType.Callout],
        ];
        allowedSymbols.forEach(([name, symbolType]) => {
            this.addToggleSetting(containerEl, name, '', config.isSymbolTypeEnabled(symbolType), null, (isEnabled) => {
                config.setSymbolTypeEnabled(symbolType, isEnabled);
                config.save();
            });
        });
    }
    showEnableLinksToggle(containerEl, config) {
        const isLinksEnabled = config.isSymbolTypeEnabled(SymbolType.Link);
        this.addToggleSetting(containerEl, 'Show Links', '', isLinksEnabled, null, (isEnabled) => {
            config.setSymbolTypeEnabled(SymbolType.Link, isEnabled);
            // have to wait for the save here because the call to display() will
            // trigger a read of the updated data
            config.saveSettings().then(() => {
                // reload the settings panel. This will cause the sublink types toggle
                // controls to be shown/hidden based on isLinksEnabled status
                this.mainSettingsTab.display();
            }, (reason) => console.log('Switcher++: error saving "Show Links" setting. ', reason));
        });
        if (isLinksEnabled) {
            const allowedLinkTypes = [
                ['Links to headings', LinkType.Heading],
                ['Links to blocks', LinkType.Block],
            ];
            allowedLinkTypes.forEach(([name, linkType]) => {
                const isExcluded = (config.excludeLinkSubTypes & linkType) === linkType;
                const setting = this.addToggleSetting(containerEl, name, '', !isExcluded, null, (isEnabled) => this.saveEnableSubLinkChange(linkType, isEnabled));
                setting.setClass('qsp-setting-item-indent');
            });
        }
    }
    saveEnableSubLinkChange(linkType, isEnabled) {
        const { config } = this;
        let exclusions = config.excludeLinkSubTypes;
        if (isEnabled) {
            // remove from exclusion list
            exclusions &= ~linkType;
        }
        else {
            // add to exclusion list
            exclusions |= linkType;
        }
        config.excludeLinkSubTypes = exclusions;
        config.save();
    }
}

class SwitcherPlusSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin, config) {
        super(app, plugin);
        this.config = config;
    }
    display() {
        const { containerEl } = this;
        const tabSections = [
            GeneralSettingsTabSection,
            SymbolSettingsTabSection,
            HeadingsSettingsTabSection,
            EditorSettingsTabSection,
            RelatedItemsSettingsTabSection,
            StarredSettingsTabSection,
            CommandListSettingsTabSection,
            WorkspaceSettingsTabSection,
        ];
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Quick Switcher++ Settings' });
        tabSections.forEach((tabSectionClass) => {
            this.displayTabSection(tabSectionClass);
        });
    }
    displayTabSection(tabSectionClass) {
        const { app, config, containerEl } = this;
        const tabSection = new tabSectionClass(app, this, config);
        tabSection.display(containerEl);
    }
}

class Handler {
    constructor(app, settings) {
        this.app = app;
        this.settings = settings;
    }
    get commandString() {
        return null;
    }
    reset() {
        /* noop */
    }
    getEditorInfo(leaf) {
        const { excludeViewTypes } = this.settings;
        let file = null;
        let isValidSource = false;
        let cursor = null;
        if (leaf) {
            const { view } = leaf;
            const viewType = view.getViewType();
            file = view.file;
            cursor = this.getCursorPosition(view);
            // determine if the current active editor pane is valid
            const isCurrentEditorValid = !excludeViewTypes.includes(viewType);
            // whether or not the current active editor can be used as the target for
            // symbol search
            isValidSource = isCurrentEditorValid && !!file;
        }
        return { isValidSource, leaf, file, suggestion: null, cursor };
    }
    getSuggestionInfo(suggestion) {
        const info = this.getSourceInfoFromSuggestion(suggestion);
        let leaf = info.leaf;
        if (info.isValidSource) {
            // try to find a matching leaf for suggestion types that don't explicitly
            // provide one. This is primarily needed to be able to focus an
            // existing pane if there is one
            ({ leaf } = this.findMatchingLeaf(info.file, info.leaf));
        }
        // Get the cursor information to support `selectNearestHeading`
        const cursor = this.getCursorPosition(leaf?.view);
        return { ...info, leaf, cursor };
    }
    getSourceInfoFromSuggestion(suggestion) {
        let file = null;
        let leaf = null;
        // Can't use a symbol, workspace, unresolved (non-existent file) suggestions as
        // the target for another symbol command, because they don't point to a file
        const isFileBasedSuggestion = suggestion &&
            !isSymbolSuggestion(suggestion) &&
            !isUnresolvedSuggestion(suggestion) &&
            !isWorkspaceSuggestion(suggestion) &&
            !isCommandSuggestion(suggestion);
        if (isFileBasedSuggestion) {
            file = suggestion.file;
        }
        if (isEditorSuggestion(suggestion)) {
            leaf = suggestion.item;
        }
        const isValidSource = !!file;
        return { isValidSource, leaf, file, suggestion };
    }
    /**
     * Retrieves the position of the cursor, given that view is in a Mode that supports cursors.
     * @param  {View} view
     * @returns EditorPosition
     */
    getCursorPosition(view) {
        let cursor = null;
        if (view?.getViewType() === 'markdown') {
            const md = view;
            if (md.getMode() !== 'preview') {
                const { editor } = md;
                cursor = editor.getCursor('head');
            }
        }
        return cursor;
    }
    /**
     * Returns the text of the first H1 contained in sourceFile, or sourceFile
     * path if an H1 does not exist
     * @param  {TFile} sourceFile
     * @returns string
     */
    getTitleText(sourceFile) {
        const path = stripMDExtensionFromPath(sourceFile);
        const h1 = this.getFirstH1(sourceFile);
        return h1?.heading ?? path;
    }
    /**
     * Finds and returns the first H1 from sourceFile
     * @param  {TFile} sourceFile
     * @returns HeadingCache
     */
    getFirstH1(sourceFile) {
        let h1 = null;
        const { metadataCache } = this.app;
        const headingList = metadataCache.getFileCache(sourceFile)?.headings?.filter((v) => v.level === 1) ??
            [];
        if (headingList.length) {
            h1 = headingList.reduce((acc, curr) => {
                const { line: currLine } = curr.position.start;
                const accLine = acc.position.start.line;
                return currLine < accLine ? curr : acc;
            });
        }
        return h1;
    }
    /**
     * Finds the first open WorkspaceLeaf that is showing source file.
     * @param  {TFile} file The source file that is being shown to find
     * @param  {WorkspaceLeaf} leaf An already open editor, or, a 'reference' WorkspaceLeaf (example: backlinks, outline, etc.. views) that is used to find the associated editor if one exists.
     * @param  {} shouldIncludeRefViews=false set to true to make reference view types valid return candidates.
     * @returns TargetInfo
     */
    findMatchingLeaf(file, leaf, shouldIncludeRefViews = false) {
        let matchingLeaf = null;
        const hasSourceLeaf = !!leaf;
        const { settings: { referenceViews, excludeViewTypes, includeSidePanelViewTypes }, } = this;
        const isMatch = (candidateLeaf) => {
            let val = false;
            if (candidateLeaf?.view) {
                const isCandidateRefView = referenceViews.includes(candidateLeaf.view.getViewType());
                const isValidCandidate = shouldIncludeRefViews || !isCandidateRefView;
                const isSourceRefView = hasSourceLeaf && referenceViews.includes(leaf.view.getViewType());
                if (isValidCandidate) {
                    if (hasSourceLeaf && (shouldIncludeRefViews || !isSourceRefView)) {
                        val = candidateLeaf === leaf;
                    }
                    else {
                        val = candidateLeaf.view.file === file;
                    }
                }
            }
            return val;
        };
        // Prioritize the active leaf matches first, otherwise find the first matching leaf
        const activeLeaf = this.getActiveLeaf();
        if (isMatch(activeLeaf)) {
            matchingLeaf = activeLeaf;
        }
        else {
            const leaves = this.getOpenLeaves(excludeViewTypes, includeSidePanelViewTypes);
            // put leaf at the first index so it gets checked first
            matchingLeaf = [leaf, ...leaves].find(isMatch);
        }
        return {
            leaf: matchingLeaf ?? null,
            file,
            suggestion: null,
            isValidSource: false,
        };
    }
    /**
     * Determines whether or not a new leaf should be created taking user
     * settings into account
     * @param  {PaneType | boolean} navType
     * @param  {} isAlreadyOpen=false Set to true if there is a pane showing the file already
     * @param  {Mode} mode? Only Symbol mode has special handling.
     * @returns boolean
     */
    applyTabCreationPreferences(navType, isAlreadyOpen = false, mode) {
        let preferredNavType = navType;
        const { onOpenPreferNewTab, alwaysNewTabForSymbols, useActiveTabForSymbolsOnMobile } = this.settings;
        if (navType === false) {
            if (onOpenPreferNewTab) {
                preferredNavType = !isAlreadyOpen;
            }
            else if (mode === Mode.SymbolList) {
                preferredNavType = obsidian.Platform.isMobile
                    ? !useActiveTabForSymbolsOnMobile
                    : alwaysNewTabForSymbols;
            }
        }
        return preferredNavType;
    }
    /**
     * Determines if a leaf belongs to the main editor panel (workspace.rootSplit or
     * workspace.floatingSplit) as opposed to the side panels
     * @param  {WorkspaceLeaf} leaf
     * @returns boolean
     */
    isMainPanelLeaf(leaf) {
        const { workspace } = this.app;
        const root = leaf?.getRoot();
        return root === workspace.rootSplit || root === workspace.floatingSplit;
    }
    /**
     * Reveals and optionally bring into focus a WorkspaceLeaf, including leaves
     * from the side panels.
     * @param  {WorkspaceLeaf} leaf
     * @param  {boolean} pushHistory?
     * @param  {Record<string} eState?
     * @param  {} unknown>
     * @returns void
     */
    activateLeaf(leaf, pushHistory, eState) {
        const { workspace } = this.app;
        const isInSidePanel = !this.isMainPanelLeaf(leaf);
        const state = { focus: true, ...eState };
        if (isInSidePanel) {
            workspace.revealLeaf(leaf);
        }
        workspace.setActiveLeaf(leaf, pushHistory, true);
        leaf.view.setEphemeralState(state);
    }
    /**
     * Returns a array of all open WorkspaceLeaf taking into account
     * excludeMainPanelViewTypes and includeSidePanelViewTypes.
     * @param  {string[]} excludeMainPanelViewTypes?
     * @param  {string[]} includeSidePanelViewTypes?
     * @returns WorkspaceLeaf[]
     */
    getOpenLeaves(excludeMainPanelViewTypes, includeSidePanelViewTypes) {
        const leaves = [];
        const saveLeaf = (l) => {
            const viewType = l.view?.getViewType();
            if (this.isMainPanelLeaf(l)) {
                if (!excludeMainPanelViewTypes?.includes(viewType)) {
                    leaves.push(l);
                }
            }
            else if (includeSidePanelViewTypes?.includes(viewType)) {
                leaves.push(l);
            }
        };
        this.app.workspace.iterateAllLeaves(saveLeaf);
        return leaves;
    }
    /**
     * Loads a file into a WorkspaceLeaf based on navType
     * @param  {TFile} file
     * @param  {PaneType|boolean} navType
     * @param  {OpenViewState} openState?
     * @param  {string} errorContext?
     * @param  {SplitDirection} splitDirection if navType is 'split', the direction to
     * open the split. Defaults to 'vertical'
     * @returns void
     */
    openFileInLeaf(file, navType, openState, errorContext, splitDirection = 'vertical') {
        const { workspace } = this.app;
        errorContext = errorContext ?? '';
        const message = `Switcher++: error opening file. ${errorContext}`;
        const getLeaf = () => {
            return navType === 'split'
                ? workspace.getLeaf(navType, splitDirection)
                : workspace.getLeaf(navType);
        };
        try {
            getLeaf()
                .openFile(file, openState)
                .catch((reason) => {
                console.log(message, reason);
            });
        }
        catch (error) {
            console.log(message, error);
        }
    }
    /**
     * Determines whether to activate (make active and focused) an existing WorkspaceLeaf
     * (searches through all leaves), or create a new WorkspaceLeaf, or reuse an unpinned
     * WorkspaceLeaf, or create a new window in order to display file. This takes user
     * settings and event status into account.
     * @param  {MouseEvent|KeyboardEvent} evt navigation trigger event
     * @param  {TFile} file The file to display
     * @param  {string} errorContext Custom text to save in error messages
     * @param  {OpenViewState} openState? State to pass to the new, or activated view. If
     * falsy, default values will be used
     * @param  {WorkspaceLeaf} leaf? WorkspaceLeaf, or reference WorkspaceLeaf
     * (backlink, outline, etc..) to activate if it's already known
     * @param  {Mode} mode? Only Symbol mode has custom handling
     * @param  {boolean} shouldIncludeRefViews whether reference WorkspaceLeaves are valid
     * targets for activation
     * @returns void
     */
    navigateToLeafOrOpenFile(evt, file, errorContext, openState, leaf, mode, shouldIncludeRefViews = false) {
        const { leaf: targetLeaf } = this.findMatchingLeaf(file, leaf, shouldIncludeRefViews);
        const isAlreadyOpen = !!targetLeaf;
        const splitDirection = evt.shiftKey ? 'horizontal' : 'vertical';
        const key = evt.key;
        let navType = obsidian.Keymap.isModEvent(evt);
        if (navType === true || navType === 'tab') {
            if (key === 'o') {
                // cmd-o to create new window
                navType = 'window';
            }
            else if (key === '\\') {
                // cmd-\ to create split
                navType = 'split';
            }
        }
        navType = this.applyTabCreationPreferences(navType, isAlreadyOpen, mode);
        this.activateLeafOrOpenFile(navType, file, errorContext, targetLeaf, openState, splitDirection);
    }
    /**
     * Activates leaf (if provided), or load file into another leaf based on navType
     * @param  {PaneType|boolean} navType
     * @param  {TFile} file
     * @param  {string} errorContext
     * @param  {WorkspaceLeaf} leaf? optional if supplied and navType is
     * false then leaf will be activated
     * @param  {OpenViewState} openState?
     * @param  {SplitDirection} splitDirection? if navType is 'split', the direction to
     * open the split
     * @returns void
     */
    activateLeafOrOpenFile(navType, file, errorContext, leaf, openState, splitDirection) {
        // default to having the pane active and focused
        openState = openState ?? { active: true, eState: { active: true, focus: true } };
        if (leaf && navType === false) {
            const eState = openState?.eState;
            this.activateLeaf(leaf, true, eState);
        }
        else {
            this.openFileInLeaf(file, navType, openState, errorContext, splitDirection);
        }
    }
    /**
     * Renders the UI elements to display path information for file using the
     * stored configuration settings
     * @param  {HTMLElement} parentEl containing element, this should be the element with
     * the "suggestion-content" style
     * @param  {TFile} file
     * @param  {boolean} excludeOptionalFilename? set to true to hide the filename in cases
     * where when {PathDisplayFormat} is set to FolderPathFilenameOptional
     * @param  {SearchResult} match?
     * @param  {boolean} overridePathFormat? set to true force display the path and set
     * {PathDisplayFormat} to FolderPathFilenameOptional
     * @returns void
     */
    renderPath(parentEl, file, excludeOptionalFilename, match, overridePathFormat) {
        if (parentEl && file) {
            const isRoot = file.parent.isRoot();
            let format = this.settings.pathDisplayFormat;
            let hidePath = format === PathDisplayFormat.None || (isRoot && this.settings.hidePathIfRoot);
            if (overridePathFormat) {
                format = PathDisplayFormat.FolderPathFilenameOptional;
                hidePath = false;
            }
            if (!hidePath) {
                const wrapperEl = parentEl.createDiv({ cls: ['suggestion-note', 'qsp-note'] });
                const path = this.getPathDisplayText(file, format, excludeOptionalFilename);
                const iconEl = wrapperEl.createSpan({ cls: ['qsp-path-indicator'] });
                obsidian.setIcon(iconEl, 'folder', 13);
                const pathEl = wrapperEl.createSpan({ cls: 'qsp-path' });
                obsidian.renderResults(pathEl, path, match);
            }
        }
    }
    /**
     * Formats the path of file based on displayFormat
     * @param  {TFile} file
     * @param  {PathDisplayFormat} displayFormat
     * @param  {boolean} excludeOptionalFilename? Only applicable to
     * {PathDisplayFormat.FolderPathFilenameOptional}. When true will exclude the filename from the returned string
     * @returns string
     */
    getPathDisplayText(file, displayFormat, excludeOptionalFilename) {
        let text = '';
        if (file) {
            const { parent } = file;
            const dirname = parent.name;
            const isRoot = parent.isRoot();
            // root path is expected to always be "/"
            const rootPath = this.app.vault.getRoot().path;
            switch (displayFormat) {
                case PathDisplayFormat.FolderWithFilename:
                    text = isRoot ? `${file.name}` : obsidian.normalizePath(`${dirname}/${file.name}`);
                    break;
                case PathDisplayFormat.FolderOnly:
                    text = isRoot ? rootPath : dirname;
                    break;
                case PathDisplayFormat.Full:
                    text = file.path;
                    break;
                case PathDisplayFormat.FolderPathFilenameOptional:
                    if (excludeOptionalFilename) {
                        text = parent.path;
                        if (!isRoot) {
                            text += rootPath; // add explicit trailing /
                        }
                    }
                    else {
                        text = this.getPathDisplayText(file, PathDisplayFormat.Full);
                    }
                    break;
            }
        }
        return text;
    }
    /**
     * Creates the UI elements to display the primary suggestion text using
     * the correct styles.
     * @param  {HTMLElement} parentEl containing element, this should be the element with
     * the "suggestion-item" style
     * @param  {string} content
     * @param  {SearchResult} match
     * @param  {number} offset?
     * @returns HTMLDivElement
     */
    renderContent(parentEl, content, match, offset) {
        const contentEl = parentEl.createDiv({
            cls: ['suggestion-content', 'qsp-content'],
        });
        const titleEl = contentEl.createDiv({
            cls: ['suggestion-title', 'qsp-title'],
        });
        obsidian.renderResults(titleEl, content, match, offset);
        return contentEl;
    }
    /** add the base suggestion styles to the suggestion container element
     * @param  {HTMLElement} parentEl container element
     * @param  {string[]} additionalStyles? optional styles to add
     */
    addClassesToSuggestionContainer(parentEl, additionalStyles) {
        const styles = ['mod-complex'];
        if (additionalStyles) {
            styles.push(...additionalStyles);
        }
        parentEl?.addClasses(styles);
    }
    /**
     * Searches through primaryString, if not match is found,
     * searches through secondaryString
     * @param  {PreparedQuery} prepQuery
     * @param  {string} primaryString
     * @param  {string} secondaryString?
     * @returns { isPrimary: boolean; match?: SearchResult }
     */
    fuzzySearchStrings(prepQuery, primaryString, secondaryString) {
        let isPrimary = false;
        let match = null;
        if (primaryString) {
            match = obsidian.fuzzySearch(prepQuery, primaryString);
            isPrimary = !!match;
        }
        if (!match && secondaryString) {
            match = obsidian.fuzzySearch(prepQuery, secondaryString);
            if (match) {
                match.score -= 1;
            }
        }
        return {
            isPrimary,
            match,
        };
    }
    /**
     * Searches through primaryText, if no match is found and file is not null, it will
     * fallback to searching 1) file.basename, 2) file parent path
     * @param  {PreparedQuery} prepQuery
     * @param  {TFile} file
     * @param  {string} primaryString?
     * @returns SearchResultWithFallback
     */
    fuzzySearchWithFallback(prepQuery, primaryString, file) {
        let matchType = MatchType.None;
        let matchText;
        let match = null;
        const search = (matchTypes, p1, p2) => {
            const res = this.fuzzySearchStrings(prepQuery, p1, p2);
            if (res.match) {
                matchType = matchTypes[1];
                matchText = p2;
                match = res.match;
                if (res.isPrimary) {
                    matchType = matchTypes[0];
                    matchText = p1;
                }
            }
            return !!res.match;
        };
        const isMatch = search([MatchType.Primary, MatchType.None], primaryString);
        if (!isMatch && file) {
            const { basename, parent: { path }, } = file;
            search([MatchType.Basename, MatchType.ParentPath], basename, path);
        }
        return { matchType, matchText, match };
    }
    /**
     * Display the provided information a suggestion with the content and path information on separate lines
     * @param  {HTMLElement} parentEl
     * @param  {string[]} parentElStyles
     * @param  {string} content
     * @param  {TFile} file
     * @param  {MatchType} matchType
     * @param  {SearchResult} match
     * @returns void
     */
    renderAsFileInfoPanel(parentEl, parentElStyles, content, file, matchType, match, excludeOptionalFilename = true) {
        let contentMatch = match;
        let pathMatch = null;
        if (matchType === MatchType.ParentPath) {
            contentMatch = null;
            pathMatch = match;
        }
        this.addClassesToSuggestionContainer(parentEl, parentElStyles);
        const contentEl = this.renderContent(parentEl, content, contentMatch);
        this.renderPath(contentEl, file, excludeOptionalFilename, pathMatch, !!pathMatch);
    }
    /**
     * Returns the currently active leaf across all root workspace splits
     * @returns WorkspaceLeaf | null
     */
    getActiveLeaf() {
        return Handler.getActiveLeaf(this.app.workspace);
    }
    /**
     * Returns the currently active leaf across all root workspace splits
     * @param  {Workspace} workspace
     * @returns WorkspaceLeaf | null
     */
    static getActiveLeaf(workspace) {
        const leaf = workspace?.getActiveViewOfType(obsidian.View)?.leaf;
        return leaf ?? null;
    }
    /**
     * Displays extra flair icons for an item, and adds any associated css classes
     * to parentEl
     * @param  {HTMLElement} parentEl the suggestion container element
     * @param  {AnySuggestion} sugg the suggestion item
     * @param  {HTMLDivElement=null} flairContainerEl optional, if null, it will be created
     * @returns HTMLDivElement the flairContainerEl that was passed in or created
     */
    renderOptionalIndicators(parentEl, sugg, flairContainerEl = null) {
        const indicatorData = new Map();
        indicatorData.set('isRecentOpen', {
            iconName: 'history',
            parentElClass: 'qsp-recent-file',
            indicatorElClass: 'qsp-recent-indicator',
        });
        indicatorData.set('isOpenInEditor', {
            iconName: 'lucide-file-edit',
            parentElClass: 'qsp-open-editor',
            indicatorElClass: 'qsp-editor-indicator',
        });
        indicatorData.set('isStarred', {
            iconName: 'lucide-star',
            parentElClass: 'qsp-starred-file',
            indicatorElClass: 'qsp-starred-indicator',
        });
        if (!flairContainerEl) {
            flairContainerEl = this.createFlairContainer(parentEl);
        }
        for (const [state, data] of indicatorData.entries()) {
            if (sugg[state] === true) {
                if (data.parentElClass) {
                    parentEl?.addClass(data.parentElClass);
                }
                this.renderIndicator(flairContainerEl, [data.indicatorElClass], data.iconName);
            }
        }
        return flairContainerEl;
    }
    /**
     * @param  {HTMLDivElement} flairContainerEl
     * @param  {string[]} indicatorClasses additional css classes to add to flair element
     * @param  {string} svgIconName? the name of the svg icon to use
     * @param  {string} indicatorText? the text content of the flair element
     * @returns HTMLElement the flair icon wrapper element
     */
    renderIndicator(flairContainerEl, indicatorClasses, svgIconName, indicatorText) {
        const cls = ['suggestion-flair', ...indicatorClasses];
        const flairEl = flairContainerEl?.createSpan({ cls });
        if (flairEl) {
            if (svgIconName) {
                flairEl.addClass('svg-icon');
                obsidian.setIcon(flairEl, svgIconName);
            }
            if (indicatorText) {
                flairEl.setText(indicatorText);
            }
        }
        return flairEl;
    }
    /**
     * Creates a child Div element with the appropriate css classes for flair icons
     * @param  {HTMLElement} parentEl
     * @returns HTMLDivElement
     */
    createFlairContainer(parentEl) {
        return parentEl?.createDiv({ cls: ['suggestion-aux', 'qsp-aux'] });
    }
    /**
     * Retrieves a TFile object using path. Return null if path does not represent
     * a TFile object.
     * @param  {string} path
     * @returns TFile|null
     */
    getTFileByPath(path) {
        let file = null;
        const abstractItem = this.app.vault.getAbstractFileByPath(path);
        if (isTFile(abstractItem)) {
            file = abstractItem;
        }
        return file;
    }
    /**
     * @param  {WorkspaceEnvList} currentWorkspaceEnvList
     * @param  {V} sugg
     * @returns V
     */
    static updateWorkspaceEnvListStatus(currentWorkspaceEnvList, sugg) {
        if (currentWorkspaceEnvList && sugg?.file) {
            const { file } = sugg;
            sugg.isOpenInEditor = currentWorkspaceEnvList.openWorkspaceFiles?.has(file);
            sugg.isRecentOpen = currentWorkspaceEnvList.mostRecentFiles?.has(file);
            sugg.isStarred = currentWorkspaceEnvList.starredFiles?.has(file);
        }
        return sugg;
    }
}

const WORKSPACE_PLUGIN_ID = 'workspaces';
class WorkspaceHandler extends Handler {
    get commandString() {
        return this.settings?.workspaceListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        if (this.isWorkspacesPluginEnabled()) {
            inputInfo.mode = Mode.WorkspaceList;
            const workspaceCmd = inputInfo.parsedCommand(Mode.WorkspaceList);
            workspaceCmd.index = index;
            workspaceCmd.parsedInput = filterText;
            workspaceCmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const items = this.getItems();
            items.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, item.id);
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    suggestions.push({ type: SuggestionType.WorkspaceList, item, match });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-workspace']);
            this.renderContent(parentEl, sugg.item.id, sugg.match);
        }
    }
    onChooseSuggestion(sugg, _evt) {
        if (sugg) {
            const { id } = sugg.item;
            const pluginInstance = this.getSystemWorkspacesPluginInstance();
            if (typeof pluginInstance['loadWorkspace'] === 'function') {
                pluginInstance.loadWorkspace(id);
            }
        }
    }
    getItems() {
        const items = [];
        const workspaces = this.getSystemWorkspacesPluginInstance()?.workspaces;
        if (workspaces) {
            Object.keys(workspaces).forEach((id) => items.push({ id, type: 'workspaceInfo' }));
        }
        return items;
    }
    isWorkspacesPluginEnabled() {
        const plugin = this.getSystemWorkspacesPlugin();
        return plugin?.enabled;
    }
    getSystemWorkspacesPlugin() {
        return getInternalPluginById(this.app, WORKSPACE_PLUGIN_ID);
    }
    getSystemWorkspacesPluginInstance() {
        const workspacesPlugin = this.getSystemWorkspacesPlugin();
        return workspacesPlugin?.instance;
    }
}

class EditorHandler extends Handler {
    get commandString() {
        return this.settings?.editorListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        inputInfo.mode = Mode.EditorList;
        const editorCmd = inputInfo.parsedCommand(Mode.EditorList);
        editorCmd.index = index;
        editorCmd.parsedInput = filterText;
        editorCmd.isValidated = true;
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const items = this.getItems();
            items.forEach((item) => {
                const file = item.view?.file;
                let shouldPush = true;
                let result = { matchType: MatchType.None, match: null };
                if (hasSearchTerm) {
                    result = this.fuzzySearchWithFallback(prepQuery, item.getDisplayText(), file);
                    shouldPush = result.matchType !== MatchType.None;
                }
                if (shouldPush) {
                    suggestions.push(EditorHandler.createSuggestion(inputInfo.currentWorkspaceEnvList, item, file, result));
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    getItems() {
        const { excludeViewTypes, includeSidePanelViewTypes } = this.settings;
        return this.getOpenLeaves(excludeViewTypes, includeSidePanelViewTypes);
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { file, matchType, match, item } = sugg;
            this.renderAsFileInfoPanel(parentEl, ['qsp-suggestion-editor'], item.getDisplayText(), file, matchType, match);
            this.renderOptionalIndicators(parentEl, sugg);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            this.navigateToLeafOrOpenFile(evt, sugg.file, 'Unable to reopen existing editor in new Leaf.', null, sugg.item, null, true);
        }
    }
    static createSuggestion(currentWorkspaceEnvList, leaf, file, result) {
        result = result ?? { matchType: MatchType.None, match: null, matchText: null };
        const sugg = {
            item: leaf,
            file,
            type: SuggestionType.EditorList,
            ...result,
        };
        return Handler.updateWorkspaceEnvListStatus(currentWorkspaceEnvList, sugg);
    }
}

class HeadingsHandler extends Handler {
    get commandString() {
        return this.settings?.headingsListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        inputInfo.mode = Mode.HeadingsList;
        const headingsCmd = inputInfo.parsedCommand(Mode.HeadingsList);
        headingsCmd.index = index;
        headingsCmd.parsedInput = filterText;
        headingsCmd.isValidated = true;
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { start: { line, col }, end: endLoc, } = sugg.item.position;
            // state information to highlight the target heading
            const eState = {
                active: true,
                focus: true,
                startLoc: { line, col },
                endLoc,
                line,
                cursor: {
                    from: { line, ch: col },
                    to: { line, ch: col },
                },
            };
            this.navigateToLeafOrOpenFile(evt, sugg.file, 'Unable to navigate to heading for file.', { active: true, eState });
        }
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { item } = sugg;
            this.addClassesToSuggestionContainer(parentEl, [
                'qsp-suggestion-headings',
                `qsp-headings-l${item.level}`,
            ]);
            const contentEl = this.renderContent(parentEl, item.heading, sugg.match);
            this.renderPath(contentEl, sugg.file);
            // render the flair icons
            const flairContainerEl = this.createFlairContainer(parentEl);
            this.renderOptionalIndicators(parentEl, sugg, flairContainerEl);
            this.renderIndicator(flairContainerEl, ['qsp-headings-indicator'], null, HeadingIndicators[item.level]);
            if (sugg.downranked) {
                parentEl.addClass('mod-downranked');
            }
        }
    }
    getSuggestions(inputInfo) {
        let suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm } = inputInfo.searchQuery;
            if (hasSearchTerm) {
                const { limit } = this.settings;
                suggestions = this.getAllFilesSuggestions(inputInfo);
                obsidian.sortSearchResults(suggestions);
                if (suggestions.length > 0 && limit > 0) {
                    suggestions = suggestions.slice(0, limit);
                }
            }
            else {
                suggestions = this.getInitialSuggestionList(inputInfo);
            }
        }
        return suggestions;
    }
    getAllFilesSuggestions(inputInfo) {
        const suggestions = [];
        const { prepQuery } = inputInfo.searchQuery;
        const { app: { vault }, settings: { strictHeadingsOnly, showExistingOnly, excludeFolders }, } = this;
        const isExcludedFolder = matcherFnForRegExList(excludeFolders);
        let nodes = [vault.getRoot()];
        while (nodes.length > 0) {
            const node = nodes.pop();
            if (isTFile(node)) {
                this.addSuggestionsFromFile(inputInfo, suggestions, node, prepQuery);
            }
            else if (!isExcludedFolder(node.path)) {
                nodes = nodes.concat(node.children);
            }
        }
        if (!strictHeadingsOnly && !showExistingOnly) {
            this.addUnresolvedSuggestions(suggestions, prepQuery);
        }
        return suggestions;
    }
    addSuggestionsFromFile(inputInfo, suggestions, file, prepQuery) {
        const { searchAllHeadings, strictHeadingsOnly, shouldSearchFilenames, shouldShowAlias, } = this.settings;
        if (this.shouldIncludeFile(file)) {
            const isH1Matched = this.addHeadingSuggestions(inputInfo, suggestions, prepQuery, file, searchAllHeadings);
            if (!strictHeadingsOnly) {
                if (shouldSearchFilenames || !isH1Matched) {
                    // if strict is disabled and filename search is enabled or there
                    // isn't an H1 match, then do a fallback search against the filename, then path
                    this.addFileSuggestions(inputInfo, suggestions, prepQuery, file);
                }
                if (shouldShowAlias) {
                    this.addAliasSuggestions(inputInfo, suggestions, prepQuery, file);
                }
            }
        }
    }
    downrankScoreIfIgnored(sugg) {
        if (this.app.metadataCache.isUserIgnored(sugg?.file?.path)) {
            sugg.downranked = true;
            if (sugg.match) {
                sugg.match.score -= 10;
            }
        }
        return sugg;
    }
    shouldIncludeFile(file) {
        let retVal = false;
        const { settings: { excludeObsidianIgnoredFiles, builtInSystemOptions: { showAttachments, showAllFileTypes }, }, app: { viewRegistry, metadataCache }, } = this;
        if (isTFile(file)) {
            const { extension } = file;
            if (!metadataCache.isUserIgnored(file.path) || !excludeObsidianIgnoredFiles) {
                retVal = viewRegistry.isExtensionRegistered(extension)
                    ? showAttachments || extension === 'md'
                    : showAllFileTypes;
            }
        }
        return retVal;
    }
    addAliasSuggestions(inputInfo, suggestions, prepQuery, file) {
        const { metadataCache } = this.app;
        const frontMatter = metadataCache.getFileCache(file)?.frontmatter;
        if (frontMatter) {
            const aliases = FrontMatterParser.getAliases(frontMatter);
            let i = aliases.length;
            // create suggestions where there is a match with an alias
            while (i--) {
                const alias = aliases[i];
                const { match } = this.fuzzySearchWithFallback(prepQuery, alias);
                if (match) {
                    suggestions.push(this.createAliasSuggestion(inputInfo, alias, file, match));
                }
            }
        }
    }
    addFileSuggestions(inputInfo, suggestions, prepQuery, file) {
        const { match, matchType, matchText } = this.fuzzySearchWithFallback(prepQuery, null, file);
        if (match) {
            suggestions.push(this.createFileSuggestion(inputInfo, file, match, matchType, matchText));
        }
    }
    addHeadingSuggestions(inputInfo, suggestions, prepQuery, file, allHeadings) {
        const { metadataCache } = this.app;
        const headingList = metadataCache.getFileCache(file)?.headings ?? [];
        let h1 = null;
        let isH1Matched = false;
        let i = headingList.length;
        while (i--) {
            const heading = headingList[i];
            let isMatched = false;
            if (allHeadings) {
                isMatched = this.matchAndPushHeading(inputInfo, suggestions, prepQuery, file, heading);
            }
            if (heading.level === 1) {
                const { line } = heading.position.start;
                if (h1 === null || line < h1.position.start.line) {
                    h1 = heading;
                    isH1Matched = isMatched;
                }
            }
        }
        if (!allHeadings && h1) {
            isH1Matched = this.matchAndPushHeading(inputInfo, suggestions, prepQuery, file, h1);
        }
        return isH1Matched;
    }
    matchAndPushHeading(inputInfo, suggestions, prepQuery, file, heading) {
        const { match } = this.fuzzySearchWithFallback(prepQuery, heading.heading);
        if (match) {
            suggestions.push(this.createHeadingSuggestion(inputInfo, heading, file, match));
        }
        return !!match;
    }
    addUnresolvedSuggestions(suggestions, prepQuery) {
        const { unresolvedLinks } = this.app.metadataCache;
        const unresolvedSet = new Set();
        const sources = Object.keys(unresolvedLinks);
        let i = sources.length;
        // create a distinct list of unresolved links
        while (i--) {
            // each source has an object with keys that represent the list of unresolved links
            // for that source file
            const sourcePath = sources[i];
            const links = Object.keys(unresolvedLinks[sourcePath]);
            let j = links.length;
            while (j--) {
                // unresolved links can be duplicates, use a Set to get a distinct list
                unresolvedSet.add(links[j]);
            }
        }
        const unresolvedList = Array.from(unresolvedSet);
        i = unresolvedList.length;
        // create suggestions where there is a match with an unresolved link
        while (i--) {
            const unresolved = unresolvedList[i];
            const { match } = this.fuzzySearchWithFallback(prepQuery, unresolved);
            if (match) {
                suggestions.push(this.createUnresolvedSuggestion(unresolved, match));
            }
        }
    }
    createAliasSuggestion(inputInfo, alias, file, match) {
        const sugg = {
            alias,
            file,
            ...this.createSearchMatch(match, MatchType.Primary, alias),
            type: SuggestionType.Alias,
        };
        Handler.updateWorkspaceEnvListStatus(inputInfo.currentWorkspaceEnvList, sugg);
        return this.downrankScoreIfIgnored(sugg);
    }
    createUnresolvedSuggestion(linktext, match) {
        return {
            linktext,
            ...this.createSearchMatch(match, MatchType.Primary, linktext),
            type: SuggestionType.Unresolved,
        };
    }
    createFileSuggestion(inputInfo, file, match, matchType = MatchType.None, matchText = null) {
        const sugg = {
            file,
            match,
            matchType,
            matchText,
            type: SuggestionType.File,
        };
        Handler.updateWorkspaceEnvListStatus(inputInfo.currentWorkspaceEnvList, sugg);
        return this.downrankScoreIfIgnored(sugg);
    }
    createHeadingSuggestion(inputInfo, item, file, match) {
        const sugg = {
            item,
            file,
            ...this.createSearchMatch(match, MatchType.Primary, item.heading),
            type: SuggestionType.HeadingsList,
        };
        Handler.updateWorkspaceEnvListStatus(inputInfo.currentWorkspaceEnvList, sugg);
        return this.downrankScoreIfIgnored(sugg);
    }
    createSearchMatch(match, type, text) {
        let matchType = MatchType.None;
        let matchText = null;
        if (match) {
            matchType = type;
            matchText = text;
        }
        return {
            match,
            matchType,
            matchText,
        };
    }
    getRecentFilesSuggestions(inputInfo) {
        const suggestions = [];
        const files = inputInfo?.currentWorkspaceEnvList?.mostRecentFiles;
        files?.forEach((file) => {
            if (this.shouldIncludeFile(file)) {
                const h1 = this.getFirstH1(file);
                const sugg = h1
                    ? this.createHeadingSuggestion(inputInfo, h1, file, null)
                    : this.createFileSuggestion(inputInfo, file, null);
                sugg.isRecentOpen = true;
                suggestions.push(sugg);
            }
        });
        return suggestions;
    }
    getOpenEditorSuggestions(inputInfo) {
        const suggestions = [];
        const leaves = inputInfo?.currentWorkspaceEnvList?.openWorkspaceLeaves;
        leaves?.forEach((leaf) => {
            const file = leaf.view?.file;
            const sugg = EditorHandler.createSuggestion(inputInfo.currentWorkspaceEnvList, leaf, file, null);
            suggestions.push(sugg);
        });
        return suggestions;
    }
    getInitialSuggestionList(inputInfo) {
        const openEditors = this.getOpenEditorSuggestions(inputInfo);
        const recentFiles = this.getRecentFilesSuggestions(inputInfo);
        return [...openEditors, ...recentFiles];
    }
}

class SymbolHandler extends Handler {
    get commandString() {
        return this.settings?.symbolListCommand;
    }
    validateCommand(inputInfo, index, filterText, activeSuggestion, activeLeaf) {
        const sourceInfo = this.getSourceInfoForSymbolOperation(activeSuggestion, activeLeaf, index === 0);
        if (sourceInfo) {
            inputInfo.mode = Mode.SymbolList;
            const symbolCmd = inputInfo.parsedCommand(Mode.SymbolList);
            symbolCmd.source = sourceInfo;
            symbolCmd.index = index;
            symbolCmd.parsedInput = filterText;
            symbolCmd.isValidated = true;
        }
    }
    async getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            this.inputInfo = inputInfo;
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const symbolCmd = inputInfo.parsedCommand(Mode.SymbolList);
            const items = await this.getItems(symbolCmd.source, hasSearchTerm);
            items.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, SymbolHandler.getSuggestionTextForSymbol(item));
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    const { file } = symbolCmd.source;
                    suggestions.push({ type: SuggestionType.SymbolList, file, item, match });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { item } = sugg;
            const parentElClasses = ['qsp-suggestion-symbol'];
            if (this.settings.symbolsInLineOrder &&
                !this.inputInfo?.searchQuery?.hasSearchTerm) {
                parentElClasses.push(`qsp-symbol-l${item.indentLevel}`);
            }
            this.addClassesToSuggestionContainer(parentEl, parentElClasses);
            const text = SymbolHandler.getSuggestionTextForSymbol(item);
            this.renderContent(parentEl, text, sugg.match);
            this.addSymbolIndicator(item, parentEl);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const symbolCmd = this.inputInfo.parsedCommand();
            const { leaf, file } = symbolCmd.source;
            const { start: { line, col }, end: endLoc, } = sugg.item.symbol.position;
            // object containing the state information for the target editor,
            // start with the range to highlight in target editor
            const eState = {
                active: true,
                focus: true,
                startLoc: { line, col },
                endLoc,
                line,
                cursor: {
                    from: { line, ch: col },
                    to: { line, ch: col },
                },
            };
            this.navigateToLeafOrOpenFile(evt, file, `Unable to navigate to symbol for file ${file.path}`, { active: true, eState }, leaf, Mode.SymbolList);
        }
    }
    reset() {
        this.inputInfo = null;
    }
    getSourceInfoForSymbolOperation(activeSuggestion, activeLeaf, isSymbolCmdPrefix) {
        const prevInputInfo = this.inputInfo;
        let prevSourceInfo = null;
        let prevMode = Mode.Standard;
        if (prevInputInfo) {
            prevSourceInfo = prevInputInfo.parsedCommand().source;
            prevMode = prevInputInfo.mode;
        }
        // figure out if the previous operation was a symbol operation
        const hasPrevSymbolSource = prevMode === Mode.SymbolList && !!prevSourceInfo;
        const activeEditorInfo = this.getEditorInfo(activeLeaf);
        const activeSuggInfo = this.getSuggestionInfo(activeSuggestion);
        // Pick the source file for a potential symbol operation, prioritizing
        // any pre-existing symbol operation that was in progress
        let sourceInfo = null;
        if (hasPrevSymbolSource) {
            sourceInfo = prevSourceInfo;
        }
        else if (activeSuggInfo.isValidSource) {
            sourceInfo = activeSuggInfo;
        }
        else if (activeEditorInfo.isValidSource && isSymbolCmdPrefix) {
            sourceInfo = activeEditorInfo;
        }
        return sourceInfo;
    }
    async getItems(sourceInfo, hasSearchTerm) {
        let items = [];
        let symbolsInLineOrder = false;
        let selectNearestHeading = false;
        if (!hasSearchTerm) {
            ({ selectNearestHeading, symbolsInLineOrder } = this.settings);
        }
        items = await this.getSymbolsFromSource(sourceInfo, symbolsInLineOrder);
        if (selectNearestHeading) {
            SymbolHandler.FindNearestHeadingSymbol(items, sourceInfo);
        }
        return items;
    }
    static FindNearestHeadingSymbol(items, sourceInfo) {
        const cursorLine = sourceInfo?.cursor?.line;
        // find the nearest heading to the current cursor pos, if applicable
        if (cursorLine) {
            let found = null;
            const headings = items.filter((v) => isHeadingCache(v.symbol));
            if (headings.length) {
                found = headings.reduce((acc, curr) => {
                    const { line: currLine } = curr.symbol.position.start;
                    const accLine = acc ? acc.symbol.position.start.line : -1;
                    return currLine > accLine && currLine <= cursorLine ? curr : acc;
                });
            }
            if (found) {
                found.isSelected = true;
            }
        }
    }
    async getSymbolsFromSource(sourceInfo, orderByLineNumber) {
        const { app: { metadataCache }, settings, } = this;
        const ret = [];
        if (sourceInfo?.file) {
            const file = sourceInfo.file;
            const symbolData = metadataCache.getFileCache(file);
            if (symbolData) {
                const push = (symbols = [], symbolType) => {
                    if (settings.isSymbolTypeEnabled(symbolType)) {
                        symbols.forEach((symbol) => ret.push({ type: 'symbolInfo', symbol, symbolType }));
                    }
                };
                push(symbolData.headings, SymbolType.Heading);
                push(symbolData.tags, SymbolType.Tag);
                this.addLinksFromSource(symbolData.links, ret);
                push(symbolData.embeds, SymbolType.Embed);
                await this.addCalloutsFromSource(file, symbolData.sections?.filter((v) => v.type === 'callout'), ret);
            }
        }
        return orderByLineNumber ? SymbolHandler.orderSymbolsByLineNumber(ret) : ret;
    }
    async addCalloutsFromSource(file, sectionCache, symbolList) {
        const { app: { vault }, settings, } = this;
        const isCalloutEnabled = settings.isSymbolTypeEnabled(SymbolType.Callout);
        if (isCalloutEnabled && sectionCache?.length && file) {
            let fileContent = null;
            try {
                fileContent = await vault.cachedRead(file);
            }
            catch (e) {
                console.log(`Switcher++: error reading file to extract callout information. ${file.path} `, e);
            }
            if (fileContent) {
                for (const cache of sectionCache) {
                    const { start, end } = cache.position;
                    const calloutStr = fileContent.slice(start.offset, end.offset);
                    const match = calloutStr.match(/^> \[!([^\]]+)\][+-]?(.*?)(?:\n>|$)/);
                    if (match) {
                        const calloutType = match[1];
                        const calloutTitle = match[match.length - 1];
                        const symbol = {
                            calloutTitle: calloutTitle.trim(),
                            calloutType,
                            ...cache,
                        };
                        symbolList.push({
                            type: 'symbolInfo',
                            symbolType: SymbolType.Callout,
                            symbol,
                        });
                    }
                }
            }
        }
    }
    addLinksFromSource(linkData, symbolList) {
        const { settings } = this;
        linkData = linkData ?? [];
        if (settings.isSymbolTypeEnabled(SymbolType.Link)) {
            for (const link of linkData) {
                const type = getLinkType(link);
                const isExcluded = (settings.excludeLinkSubTypes & type) === type;
                if (!isExcluded) {
                    symbolList.push({
                        type: 'symbolInfo',
                        symbol: link,
                        symbolType: SymbolType.Link,
                    });
                }
            }
        }
    }
    static orderSymbolsByLineNumber(symbols) {
        const sorted = symbols.sort((a, b) => {
            const { start: aStart } = a.symbol.position;
            const { start: bStart } = b.symbol.position;
            const lineDiff = aStart.line - bStart.line;
            return lineDiff === 0 ? aStart.col - bStart.col : lineDiff;
        });
        let currIndentLevel = 0;
        sorted.forEach((si) => {
            let indentLevel = 0;
            if (isHeadingCache(si.symbol)) {
                currIndentLevel = si.symbol.level;
                indentLevel = si.symbol.level - 1;
            }
            else {
                indentLevel = currIndentLevel;
            }
            si.indentLevel = indentLevel;
        });
        return sorted;
    }
    static getSuggestionTextForSymbol(symbolInfo) {
        const { symbol } = symbolInfo;
        let text;
        if (isHeadingCache(symbol)) {
            text = symbol.heading;
        }
        else if (isTagCache(symbol)) {
            text = symbol.tag.slice(1);
        }
        else if (isCalloutCache(symbol)) {
            text = symbol.calloutTitle;
        }
        else {
            const refCache = symbol;
            ({ link: text } = refCache);
            const { displayText } = refCache;
            if (displayText && displayText !== text) {
                text += `|${displayText}`;
            }
        }
        return text;
    }
    addSymbolIndicator(symbolInfo, parentEl) {
        const { symbolType, symbol } = symbolInfo;
        const flairElClasses = ['qsp-symbol-indicator'];
        const flairContainerEl = this.createFlairContainer(parentEl);
        if (isCalloutCache(symbol)) {
            flairElClasses.push(...['suggestion-flair', 'callout', 'callout-icon', 'svg-icon']);
            const calloutFlairEl = flairContainerEl.createSpan({
                cls: flairElClasses,
                // Obsidian 0.15.9: the icon glyph is set in css based on the data-callout attr
                attr: { 'data-callout': symbol.calloutType },
            });
            // Obsidian 0.15.9 the --callout-icon css prop holds the name of the icon glyph
            const iconName = calloutFlairEl.getCssPropertyValue('--callout-icon');
            obsidian.setIcon(calloutFlairEl, iconName);
        }
        else {
            let indicator;
            if (isHeadingCache(symbol)) {
                indicator = HeadingIndicators[symbol.level];
            }
            else {
                indicator = SymbolIndicators[symbolType];
            }
            this.renderIndicator(flairContainerEl, flairElClasses, null, indicator);
        }
    }
}

const STARRED_PLUGIN_ID = 'starred';
class StarredHandler extends Handler {
    get commandString() {
        return this.settings?.starredListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        if (this.isStarredPluginEnabled()) {
            inputInfo.mode = Mode.StarredList;
            const starredCmd = inputInfo.parsedCommand(Mode.StarredList);
            starredCmd.index = index;
            starredCmd.parsedInput = filterText;
            starredCmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const itemsInfo = this.getItems();
            itemsInfo.forEach(({ file, item }) => {
                let shouldPush = true;
                let result = { matchType: MatchType.None, match: null };
                if (hasSearchTerm) {
                    result = this.fuzzySearchWithFallback(prepQuery, item.title, file);
                    shouldPush = result.matchType !== MatchType.None;
                }
                if (shouldPush) {
                    suggestions.push(StarredHandler.createSuggestion(inputInfo.currentWorkspaceEnvList, item, file, result));
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { file, matchType, match, item } = sugg;
            this.renderAsFileInfoPanel(parentEl, ['qsp-suggestion-starred'], item.title, file, matchType, match);
            this.renderOptionalIndicators(parentEl, sugg);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { item } = sugg;
            if (isFileStarredItem(item)) {
                const { file } = sugg;
                this.navigateToLeafOrOpenFile(evt, file, `Unable to open Starred file ${file.path}`);
            }
        }
    }
    getItems() {
        const itemsInfo = [];
        const starredItems = this.getSystemStarredPluginInstance()?.items;
        if (starredItems) {
            starredItems.forEach((starredItem) => {
                // Only support displaying of starred files for now
                if (isFileStarredItem(starredItem)) {
                    const file = this.getTFileByPath(starredItem.path);
                    // 2022-apr when a starred file is deleted, the underlying data stored in the
                    // Starred plugin data file (starred.json) for that file remain in there, but
                    // at runtime the deleted file info is not displayed. Do the same here.
                    if (file) {
                        // 2022-apr when a starred file is renamed, the 'title' property stored in
                        // the underlying Starred plugin data file (starred.json) is not updated, but
                        // at runtime, the title that is displayed in the UI does reflect the updated
                        // filename. So do the same thing here in order to display the current
                        // filename as the starred file title
                        const title = file.basename;
                        const item = {
                            type: 'file',
                            title,
                            path: starredItem.path,
                        };
                        itemsInfo.push({ file, item });
                    }
                }
            });
        }
        return itemsInfo;
    }
    isStarredPluginEnabled() {
        const plugin = this.getSystemStarredPlugin();
        return plugin?.enabled;
    }
    getSystemStarredPlugin() {
        return getInternalPluginById(this.app, STARRED_PLUGIN_ID);
    }
    getSystemStarredPluginInstance() {
        const starredPlugin = this.getSystemStarredPlugin();
        return starredPlugin?.instance;
    }
    static createSuggestion(currentWorkspaceEnvList, item, file, result) {
        const sugg = {
            item,
            file,
            type: SuggestionType.StarredList,
            ...result,
        };
        return Handler.updateWorkspaceEnvListStatus(currentWorkspaceEnvList, sugg);
    }
}

const COMMAND_PALETTE_PLUGIN_ID = 'command-palette';
class CommandHandler extends Handler {
    get commandString() {
        return this.settings?.commandListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        inputInfo.mode = Mode.CommandList;
        const commandCmd = inputInfo.parsedCommand(Mode.CommandList);
        commandCmd.index = index;
        commandCmd.parsedInput = filterText;
        commandCmd.isValidated = true;
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const itemsInfo = this.getItems();
            itemsInfo.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, item.name);
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    suggestions.push({
                        type: SuggestionType.CommandList,
                        item,
                        match,
                    });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-command']);
            this.renderContent(parentEl, sugg.item.name, sugg.match);
        }
    }
    onChooseSuggestion(sugg) {
        if (sugg) {
            const { item } = sugg;
            this.app.commands.executeCommandById(item.id);
        }
    }
    getItems() {
        // Sort commands by their name
        const items = this.app.commands.listCommands().sort((a, b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        // Pinned commands should be at the top (if any)
        if (this.isCommandPalettePluginEnabled() &&
            this.getCommandPalettePluginInstance()?.options.pinned?.length > 0) {
            const pinnedCommandIds = this.getCommandPalettePluginInstance().options.pinned;
            // We're gonna find the pinned command in `items` and move it to the beginning
            // Therefore we need to perform "for each right"
            for (let i = pinnedCommandIds.length - 1; i >= 0; i--) {
                const commandId = pinnedCommandIds[i];
                const commandIndex = items.findIndex((c) => c.id === commandId);
                if (commandIndex > -1) {
                    const command = items[commandIndex];
                    items.splice(commandIndex, 1);
                    items.unshift(command);
                }
            }
        }
        return items;
    }
    isCommandPalettePluginEnabled() {
        const plugin = this.getCommandPalettePlugin();
        return plugin?.enabled;
    }
    getCommandPalettePlugin() {
        return getInternalPluginById(this.app, COMMAND_PALETTE_PLUGIN_ID);
    }
    getCommandPalettePluginInstance() {
        const commandPalettePlugin = this.getCommandPalettePlugin();
        return commandPalettePlugin?.instance;
    }
}

class RelatedItemsHandler extends Handler {
    get commandString() {
        return this.settings?.relatedItemsListCommand;
    }
    validateCommand(inputInfo, index, filterText, activeSuggestion, activeLeaf) {
        const sourceInfo = this.getSourceInfo(activeSuggestion, activeLeaf, index === 0);
        if (sourceInfo) {
            inputInfo.mode = Mode.RelatedItemsList;
            const cmd = inputInfo.parsedCommand(Mode.RelatedItemsList);
            cmd.source = sourceInfo;
            cmd.index = index;
            cmd.parsedInput = filterText;
            cmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            this.inputInfo = inputInfo;
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const cmd = inputInfo.parsedCommand(Mode.RelatedItemsList);
            const items = this.getItems(cmd.source);
            items.forEach((item) => {
                let shouldPush = true;
                let result = { matchType: MatchType.None, match: null };
                if (hasSearchTerm) {
                    result = this.fuzzySearchWithFallback(prepQuery, null, item.file);
                    shouldPush = result.matchType !== MatchType.None;
                }
                if (shouldPush) {
                    suggestions.push(RelatedItemsHandler.createSuggestion(inputInfo.currentWorkspaceEnvList, item, item.file, result));
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { file, matchType, match, item } = sugg;
            const iconMap = new Map([
                [RelationType.Backlink, 'links-coming-in'],
                [RelationType.DiskLocation, 'folder-tree'],
            ]);
            parentEl.setAttribute('data-relation-type', item.relationType);
            this.renderAsFileInfoPanel(parentEl, ['qsp-suggestion-related'], this.getTitleText(file), file, matchType, match);
            const flairContainerEl = this.createFlairContainer(parentEl);
            this.renderOptionalIndicators(parentEl, sugg, flairContainerEl);
            if (sugg.item.count) {
                // show the count of backlinks
                this.renderIndicator(flairContainerEl, [], null, `${sugg.item.count}`);
            }
            // render the flair icon
            this.renderIndicator(flairContainerEl, ['qsp-related-indicator'], iconMap.get(item.relationType));
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { file } = sugg;
            this.navigateToLeafOrOpenFile(evt, file, `Unable to open related file ${file.path}`);
        }
    }
    getTitleText(sourceFile) {
        return sourceFile?.basename;
    }
    getItems(sourceInfo) {
        const relatedItems = [];
        const { metadataCache } = this.app;
        const { enabledRelatedItems } = this.settings;
        const { file, suggestion } = sourceInfo;
        enabledRelatedItems.forEach((relationType) => {
            if (relationType === RelationType.Backlink) {
                let targetPath = file?.path;
                let linkMap = metadataCache.resolvedLinks;
                if (isUnresolvedSuggestion(suggestion)) {
                    targetPath = suggestion.linktext;
                    linkMap = metadataCache.unresolvedLinks;
                }
                this.addBacklinks(targetPath, linkMap, relatedItems);
            }
            else if (relationType === RelationType.DiskLocation) {
                this.addRelatedDiskFiles(file, relatedItems);
            }
        });
        return relatedItems;
    }
    addRelatedDiskFiles(sourceFile, collection) {
        const { excludeRelatedFolders, excludeOpenRelatedFiles } = this.settings;
        if (sourceFile) {
            const isExcludedFolder = matcherFnForRegExList(excludeRelatedFolders);
            let nodes = [...sourceFile.parent.children];
            while (nodes.length > 0) {
                const node = nodes.pop();
                if (isTFile(node)) {
                    const isSourceFile = node === sourceFile;
                    const isExcluded = isSourceFile ||
                        (excludeOpenRelatedFiles && !!this.findMatchingLeaf(node).leaf);
                    if (!isExcluded) {
                        collection.push({ file: node, relationType: RelationType.DiskLocation });
                    }
                }
                else if (!isExcludedFolder(node.path)) {
                    nodes = nodes.concat(node.children);
                }
            }
        }
    }
    addBacklinks(targetPath, linkMap, collection) {
        for (const [originFilePath, destPathMap] of Object.entries(linkMap)) {
            if (originFilePath !== targetPath &&
                Object.prototype.hasOwnProperty.call(destPathMap, targetPath)) {
                const count = destPathMap[targetPath];
                const originFile = this.getTFileByPath(originFilePath);
                if (originFile) {
                    collection.push({
                        count,
                        file: originFile,
                        relationType: RelationType.Backlink,
                    });
                }
            }
        }
    }
    reset() {
        this.inputInfo = null;
    }
    getSourceInfo(activeSuggestion, activeLeaf, isPrefixCmd) {
        const prevInputInfo = this.inputInfo;
        let prevSourceInfo = null;
        let prevMode = Mode.Standard;
        if (prevInputInfo) {
            prevSourceInfo = prevInputInfo.parsedCommand().source;
            prevMode = prevInputInfo.mode;
        }
        // figure out if the previous operation was a symbol operation
        const hasPrevSource = prevMode === Mode.RelatedItemsList && !!prevSourceInfo;
        const activeEditorInfo = this.getEditorInfo(activeLeaf);
        const activeSuggInfo = this.getSuggestionInfo(activeSuggestion);
        if (!activeSuggInfo.isValidSource && isUnresolvedSuggestion(activeSuggestion)) {
            // related items supports retrieving backlinks for unresolved suggestion, so
            // force UnresolvedSuggestion to be valid, even though it would otherwise not be
            activeSuggInfo.isValidSource = true;
        }
        // Pick the source file for the operation, prioritizing
        // any pre-existing operation that was in progress
        let sourceInfo = null;
        if (hasPrevSource) {
            sourceInfo = prevSourceInfo;
        }
        else if (activeSuggInfo.isValidSource) {
            sourceInfo = activeSuggInfo;
        }
        else if (activeEditorInfo.isValidSource && isPrefixCmd) {
            sourceInfo = activeEditorInfo;
        }
        return sourceInfo;
    }
    static createSuggestion(currentWorkspaceEnvList, item, file, result) {
        const sugg = {
            item,
            file: file,
            type: SuggestionType.RelatedItemsList,
            ...result,
        };
        return Handler.updateWorkspaceEnvListStatus(currentWorkspaceEnvList, sugg);
    }
}

class StandardExHandler extends Handler {
    validateCommand(_inputInfo, _index, _filterText, _activeSuggestion, _activeLeaf) {
        throw new Error('Method not implemented.');
    }
    getSuggestions(_inputInfo) {
        throw new Error('Method not implemented.');
    }
    renderSuggestion(sugg, parentEl) {
        if (isFileSuggestion(sugg)) {
            const { file, matchType, match } = sugg;
            this.renderAsFileInfoPanel(parentEl, ['qsp-suggestion-file'], file.basename, file, matchType, match);
            this.renderOptionalIndicators(parentEl, sugg);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { file } = sugg;
            this.navigateToLeafOrOpenFile(evt, file, `Unable to open file from SystemSuggestion ${file.path}`);
        }
    }
}

class InputInfo {
    constructor(inputText = '', mode = Mode.Standard) {
        this.inputText = inputText;
        this.mode = mode;
        this.currentWorkspaceEnvList = {
            openWorkspaceLeaves: new Set(),
            openWorkspaceFiles: new Set(),
            starredFiles: new Set(),
            mostRecentFiles: new Set(),
        };
        const symbolListCmd = {
            ...InputInfo.defaultParsedCommand,
            source: null,
        };
        const relatedItemsListCmd = {
            ...InputInfo.defaultParsedCommand,
            source: null,
        };
        const parsedCmds = {};
        parsedCmds[Mode.SymbolList] = symbolListCmd;
        parsedCmds[Mode.Standard] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.EditorList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.WorkspaceList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.HeadingsList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.StarredList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.CommandList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.RelatedItemsList] = relatedItemsListCmd;
        this.parsedCommands = parsedCmds;
    }
    static get defaultParsedCommand() {
        return {
            isValidated: false,
            index: -1,
            parsedInput: null,
        };
    }
    get searchQuery() {
        return this._searchQuery;
    }
    buildSearchQuery() {
        const { mode } = this;
        const input = this.parsedCommands[mode].parsedInput ?? '';
        const prepQuery = obsidian.prepareQuery(input.trim().toLowerCase());
        const hasSearchTerm = prepQuery?.query?.length > 0;
        this._searchQuery = { prepQuery, hasSearchTerm };
    }
    parsedCommand(mode) {
        mode = mode ?? this.mode;
        return this.parsedCommands[mode];
    }
}

class ModeHandler {
    constructor(app, settings, exKeymap) {
        this.app = app;
        this.settings = settings;
        this.exKeymap = exKeymap;
        // StandardExHandler one is special in that it is not a "full" handler,
        // and not attached to a mode, as a result it is not in the handlersByMode list
        const standardExHandler = new StandardExHandler(app, settings);
        const handlersByMode = new Map([
            [Mode.SymbolList, new SymbolHandler(app, settings)],
            [Mode.WorkspaceList, new WorkspaceHandler(app, settings)],
            [Mode.HeadingsList, new HeadingsHandler(app, settings)],
            [Mode.EditorList, new EditorHandler(app, settings)],
            [Mode.StarredList, new StarredHandler(app, settings)],
            [Mode.CommandList, new CommandHandler(app, settings)],
            [Mode.RelatedItemsList, new RelatedItemsHandler(app, settings)],
        ]);
        this.handlersByMode = handlersByMode;
        this.handlersByType = new Map([
            [SuggestionType.CommandList, handlersByMode.get(Mode.CommandList)],
            [SuggestionType.EditorList, handlersByMode.get(Mode.EditorList)],
            [SuggestionType.HeadingsList, handlersByMode.get(Mode.HeadingsList)],
            [SuggestionType.RelatedItemsList, handlersByMode.get(Mode.RelatedItemsList)],
            [SuggestionType.StarredList, handlersByMode.get(Mode.StarredList)],
            [SuggestionType.SymbolList, handlersByMode.get(Mode.SymbolList)],
            [SuggestionType.WorkspaceList, handlersByMode.get(Mode.WorkspaceList)],
            [SuggestionType.File, standardExHandler],
            [SuggestionType.Alias, standardExHandler],
        ]);
        this.debouncedGetSuggestions = obsidian.debounce(this.getSuggestions.bind(this), 400, true);
        this.reset();
    }
    onOpen() {
        this.exKeymap.isOpen = true;
    }
    onClose() {
        this.exKeymap.isOpen = false;
    }
    setSessionOpenMode(mode, chooser) {
        this.reset();
        chooser?.setSuggestions([]);
        if (mode !== Mode.Standard) {
            this.sessionOpenModeString = this.getHandler(mode).commandString;
        }
    }
    insertSessionOpenModeCommandString(inputEl) {
        const { sessionOpenModeString } = this;
        if (sessionOpenModeString !== null && sessionOpenModeString !== '') {
            // update UI with current command string in the case were openInMode was called
            inputEl.value = sessionOpenModeString;
            // reset to null so user input is not overridden the next time onInput is called
            this.sessionOpenModeString = null;
        }
    }
    updateSuggestions(query, chooser) {
        let handled = false;
        const { exKeymap } = this;
        // cancel any potentially previously running debounced getsuggestions call
        this.debouncedGetSuggestions.cancel();
        // get the currently active leaf across all rootSplits
        const activeLeaf = Handler.getActiveLeaf(this.app.workspace);
        const activeSugg = ModeHandler.getActiveSuggestion(chooser);
        const inputInfo = this.determineRunMode(query, activeSugg, activeLeaf);
        this.inputInfo = inputInfo;
        const { mode } = inputInfo;
        exKeymap.updateKeymapForMode(mode);
        if (mode !== Mode.Standard) {
            if (mode === Mode.HeadingsList && inputInfo.parsedCommand().parsedInput?.length) {
                // if headings mode and user is typing a query, delay getting suggestions
                this.debouncedGetSuggestions(inputInfo, chooser);
            }
            else {
                this.getSuggestions(inputInfo, chooser);
            }
            handled = true;
        }
        return handled;
    }
    renderSuggestion(sugg, parentEl) {
        let handled = false;
        if (sugg) {
            // in Headings mode, StandardExHandler should handle rendering for File
            // suggestions
            const useExHandler = this.inputInfo.mode === Mode.HeadingsList && isFileSuggestion(sugg);
            if (useExHandler || isExSuggestion(sugg)) {
                this.getHandler(sugg).renderSuggestion(sugg, parentEl);
                handled = true;
            }
        }
        return handled;
    }
    onChooseSuggestion(sugg, evt) {
        let handled = false;
        if (sugg) {
            // in Headings mode, StandardExHandler should handle the onChoose action for File
            // and Alias suggestion so that the preferOpenInNewPane setting can be handled properly
            const useExHandler = this.inputInfo.mode === Mode.HeadingsList && !isUnresolvedSuggestion(sugg);
            if (useExHandler || isExSuggestion(sugg)) {
                this.getHandler(sugg).onChooseSuggestion(sugg, evt);
                handled = true;
            }
        }
        return handled;
    }
    determineRunMode(query, activeSugg, activeLeaf) {
        const input = query ?? '';
        const info = this.addWorkspaceEnvLists(new InputInfo(input));
        if (input.length === 0) {
            this.reset();
        }
        this.validatePrefixCommands(info, activeSugg, activeLeaf);
        this.validateSourcedCommands(info, activeSugg, activeLeaf);
        return info;
    }
    getSuggestions(inputInfo, chooser) {
        chooser.setSuggestions([]);
        const { mode } = inputInfo;
        const suggestions = this.getHandler(mode).getSuggestions(inputInfo);
        const setSuggestions = (suggs) => {
            chooser.setSuggestions(suggs);
            ModeHandler.setActiveSuggestion(mode, chooser);
        };
        if (Array.isArray(suggestions)) {
            setSuggestions(suggestions);
        }
        else {
            suggestions.then((values) => {
                setSuggestions(values);
            }, (reason) => {
                console.log('Switcher++: error retrieving suggestions as Promise. ', reason);
            });
        }
    }
    validatePrefixCommands(inputInfo, activeSugg, activeLeaf) {
        const { settings } = this;
        const prefixCmds = [
            settings.editorListCommand,
            settings.workspaceListCommand,
            settings.headingsListCommand,
            settings.starredListCommand,
            settings.commandListCommand,
        ]
            .map((v) => `(${escapeRegExp(v)})`)
            // account for potential overlapping command strings
            .sort((a, b) => b.length - a.length);
        // regex that matches any of the prefix commands, and extract filter text
        const match = new RegExp(`^(${prefixCmds.join('|')})(.*)$`).exec(inputInfo.inputText);
        if (match) {
            const cmdStr = match[1];
            const filterText = match[match.length - 1];
            const handler = this.getHandler(cmdStr);
            if (handler) {
                handler.validateCommand(inputInfo, match.index, filterText, activeSugg, activeLeaf);
            }
        }
    }
    validateSourcedCommands(inputInfo, activeSugg, activeLeaf) {
        const { mode, inputText } = inputInfo;
        const unmatchedHandlers = [];
        // Standard, Headings, Starred, and EditorList mode can have an embedded command
        const supportedModes = [
            Mode.Standard,
            Mode.EditorList,
            Mode.HeadingsList,
            Mode.StarredList,
        ];
        if (supportedModes.includes(mode)) {
            const { settings } = this;
            const embeddedCmds = [settings.symbolListCommand, settings.relatedItemsListCommand]
                .map((v) => `(${escapeRegExp(v)})`)
                .sort((a, b) => b.length - a.length);
            // regex that matches any sourced command, and extract filter text
            const match = new RegExp(`(${embeddedCmds.join('|')})(.*)$`).exec(inputText);
            if (match) {
                const cmdStr = match[1];
                const filterText = match[match.length - 1];
                const handler = this.getHandler(cmdStr);
                if (handler) {
                    handler.validateCommand(inputInfo, match.index, filterText, activeSugg, activeLeaf);
                }
                // find all sourced handlers that did not match
                unmatchedHandlers.push(...this.getSourcedHandlers().filter((v) => v != handler));
            }
        }
        // if unmatchedHandlers has items then there was a match, so reset all others
        // otherwise reset all sourced handlers
        this.resetSourcedHandlers(unmatchedHandlers.length ? unmatchedHandlers : null);
    }
    static setActiveSuggestion(mode, chooser) {
        // only symbol mode currently sets an active selection
        if (mode === Mode.SymbolList) {
            const index = chooser.values
                .filter((v) => isSymbolSuggestion(v))
                .findIndex((v) => v.item.isSelected);
            if (index !== -1) {
                chooser.setSelectedItem(index, null);
                chooser.suggestions[chooser.selectedItem].scrollIntoView(false);
            }
        }
    }
    static getActiveSuggestion(chooser) {
        let activeSuggestion = null;
        if (chooser?.values) {
            activeSuggestion = chooser.values[chooser.selectedItem];
        }
        return activeSuggestion;
    }
    reset() {
        this.inputInfo = new InputInfo();
        this.sessionOpenModeString = null;
        this.resetSourcedHandlers();
    }
    resetSourcedHandlers(handlers) {
        handlers = handlers ?? this.getSourcedHandlers();
        handlers.forEach((handler) => handler?.reset());
    }
    getSourcedHandlers() {
        const sourcedModes = [Mode.RelatedItemsList, Mode.SymbolList];
        return sourcedModes.map((v) => this.getHandler(v));
    }
    addWorkspaceEnvLists(inputInfo) {
        if (inputInfo) {
            const openEditors = this.getHandler(Mode.EditorList).getItems();
            const openEditorFiles = openEditors.map((v) => v?.view?.file);
            const starredFiles = this.getHandler(Mode.StarredList)
                .getItems()
                .filter((v) => isFileStarredItem(v.item) && v.file)
                .map((v) => v.file);
            const lists = inputInfo.currentWorkspaceEnvList;
            lists.openWorkspaceLeaves = new Set(openEditors);
            lists.openWorkspaceFiles = new Set(openEditorFiles);
            lists.starredFiles = new Set(starredFiles);
            lists.mostRecentFiles = this.getRecentFiles(new Set(openEditorFiles));
        }
        return inputInfo;
    }
    getRecentFiles(ignoreFiles) {
        const recentFiles = new Set();
        const { workspace, vault } = this.app;
        const recentFilePaths = workspace.getLastOpenFiles();
        ignoreFiles = ignoreFiles ?? new Set();
        recentFilePaths?.forEach((path) => {
            const file = vault.getAbstractFileByPath(path);
            if (isTFile(file) && !ignoreFiles.has(file)) {
                recentFiles.add(file);
            }
        });
        return recentFiles;
    }
    getHandler(kind) {
        let handler;
        const { handlersByMode, handlersByType } = this;
        if (typeof kind === 'number') {
            handler = handlersByMode.get(kind);
        }
        else if (isOfType(kind, 'type')) {
            handler = handlersByType.get(kind.type);
        }
        else if (typeof kind === 'string') {
            const { settings } = this;
            const handlersByCommand = new Map([
                [settings.editorListCommand, handlersByMode.get(Mode.EditorList)],
                [settings.workspaceListCommand, handlersByMode.get(Mode.WorkspaceList)],
                [settings.headingsListCommand, handlersByMode.get(Mode.HeadingsList)],
                [settings.starredListCommand, handlersByMode.get(Mode.StarredList)],
                [settings.commandListCommand, handlersByMode.get(Mode.CommandList)],
                [settings.symbolListCommand, handlersByMode.get(Mode.SymbolList)],
                [settings.relatedItemsListCommand, handlersByMode.get(Mode.RelatedItemsList)],
            ]);
            handler = handlersByCommand.get(kind);
        }
        return handler;
    }
}

class SwitcherPlusKeymap {
    constructor(scope, chooser, modal) {
        this.scope = scope;
        this.chooser = chooser;
        this.modal = modal;
        this.standardKeysInfo = [];
        this.customKeysInfo = [];
        this.savedStandardKeysInfo = [];
        this.standardInstructionsElSelector = '.prompt-instructions';
        this.standardInstructionsElDataValue = 'standard';
        this.initKeysInfo();
        this.registerNavigationBindings(scope);
        this.addDataAttrToInstructionsEl(modal.containerEl, this.standardInstructionsElSelector, this.standardInstructionsElDataValue);
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
    }
    initKeysInfo() {
        const customFileBasedModes = [
            Mode.EditorList,
            Mode.HeadingsList,
            Mode.RelatedItemsList,
            Mode.StarredList,
            Mode.SymbolList,
        ];
        let modKey = 'Ctrl';
        let modKeyText = 'ctrl';
        let shiftText = 'shift';
        if (obsidian.Platform.isMacOS) {
            modKey = 'Meta';
            modKeyText = '⌘';
            shiftText = '⇧';
        }
        // standard mode keys that are registered by default, and
        // should be unregistered in custom modes, then re-registered in standard mode
        const standardKeysInfo = [
            { modifiers: 'Shift', key: 'Enter' },
            { modifiers: `${modKey},Shift`, key: 'Enter' },
        ];
        // custom mode keys that should be registered, then unregistered in standard mode
        // Note: modifiers should be a comma separated string of Modifiers
        // without any padding space characters
        const customKeysInfo = [
            {
                isInstructionOnly: true,
                modes: customFileBasedModes,
                modifiers: null,
                key: null,
                func: null,
                command: `${modKeyText} ↵`,
                purpose: 'open in new tab',
            },
            {
                modes: customFileBasedModes,
                modifiers: modKey,
                key: '\\',
                func: this.useSelectedItem.bind(this),
                command: `${modKeyText} \\`,
                purpose: 'open to the right',
            },
            {
                modes: customFileBasedModes,
                modifiers: `${modKey},Shift`,
                key: '\\',
                func: this.useSelectedItem.bind(this),
                command: `${modKeyText} ${shiftText} \\`,
                purpose: 'open below',
            },
            {
                modes: customFileBasedModes,
                modifiers: modKey,
                key: 'o',
                func: this.useSelectedItem.bind(this),
                command: `${modKeyText} o`,
                purpose: 'open in new window',
            },
            {
                isInstructionOnly: true,
                modes: [Mode.CommandList],
                modifiers: null,
                key: null,
                func: null,
                command: `↵`,
                purpose: 'execute command',
            },
            {
                isInstructionOnly: true,
                modes: [Mode.WorkspaceList],
                modifiers: null,
                key: null,
                func: null,
                command: `↵`,
                purpose: 'open workspace',
            },
        ];
        this.standardKeysInfo.push(...standardKeysInfo);
        this.customKeysInfo.push(...customKeysInfo);
    }
    registerNavigationBindings(scope) {
        const keys = [
            [['Ctrl'], 'n'],
            [['Ctrl'], 'p'],
            [['Ctrl'], 'j'],
            [['Ctrl'], 'k'],
        ];
        keys.forEach((v) => {
            scope.register(v[0], v[1], this.navigateItems.bind(this));
        });
    }
    updateKeymapForMode(mode) {
        const isStandardMode = mode === Mode.Standard;
        const { modal, scope, savedStandardKeysInfo, standardKeysInfo, customKeysInfo } = this;
        const customKeymaps = customKeysInfo.filter((v) => !v.isInstructionOnly);
        this.unregisterKeys(scope, customKeymaps);
        if (isStandardMode) {
            this.registerKeys(scope, savedStandardKeysInfo);
            savedStandardKeysInfo.length = 0;
            this.toggleStandardInstructions(modal.containerEl, true);
        }
        else {
            const standardKeysRemoved = this.unregisterKeys(scope, standardKeysInfo);
            if (standardKeysRemoved.length) {
                savedStandardKeysInfo.push(...standardKeysRemoved);
            }
            const customKeysToAdd = customKeymaps.filter((v) => v.modes?.includes(mode));
            this.registerKeys(scope, customKeysToAdd);
            this.showCustomInstructions(modal, customKeysInfo, mode);
        }
    }
    registerKeys(scope, keymaps) {
        keymaps.forEach((keymap) => {
            const modifiers = keymap.modifiers.split(',');
            scope.register(modifiers, keymap.key, keymap.func);
        });
    }
    unregisterKeys(scope, keyInfo) {
        const keysToRemove = [...keyInfo];
        const removed = [];
        let i = scope.keys.length;
        while (i--) {
            const keymap = scope.keys[i];
            const foundIndex = keysToRemove.findIndex((kInfo) => kInfo.modifiers === keymap.modifiers && kInfo.key === keymap.key);
            if (foundIndex >= 0) {
                scope.unregister(keymap);
                removed.push(keymap);
                keysToRemove.splice(foundIndex, 1);
            }
        }
        return removed;
    }
    addDataAttrToInstructionsEl(containerEl, selector, value) {
        const el = containerEl.querySelector(selector);
        el?.setAttribute('data-mode', value);
        return el;
    }
    clearCustomInstructions(containerEl) {
        const { standardInstructionsElSelector, standardInstructionsElDataValue } = this;
        const selector = `${standardInstructionsElSelector}:not([data-mode="${standardInstructionsElDataValue}"])`;
        const elements = containerEl.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
    }
    toggleStandardInstructions(containerEl, shouldShow) {
        const { standardInstructionsElSelector } = this;
        let displayValue = 'none';
        if (shouldShow) {
            displayValue = '';
            this.clearCustomInstructions(containerEl);
        }
        const el = containerEl.querySelector(standardInstructionsElSelector);
        if (el) {
            el.style.display = displayValue;
        }
    }
    showCustomInstructions(modal, keymapInfo, mode) {
        const { containerEl } = modal;
        const keymaps = keymapInfo.filter((keymap) => keymap.modes?.includes(mode));
        this.toggleStandardInstructions(containerEl, false);
        this.clearCustomInstructions(containerEl);
        modal.setInstructions(keymaps);
    }
    useSelectedItem(evt, _ctx) {
        this.chooser.useSelectedItem(evt);
    }
    navigateItems(evt, ctx) {
        const { isOpen, chooser } = this;
        if (isOpen) {
            const nextKeys = ['n', 'j'];
            let index = chooser.selectedItem;
            index = nextKeys.includes(ctx.key) ? ++index : --index;
            chooser.setSelectedItem(index, evt);
        }
        return false;
    }
}

function createSwitcherPlus(app, plugin) {
    const SystemSwitcherModal = getSystemSwitcherInstance(app)
        ?.QuickSwitcherModal;
    if (!SystemSwitcherModal) {
        console.log('Switcher++: unable to extend system switcher. Plugin UI will not be loaded. Use the builtin switcher instead.');
        return null;
    }
    const SwitcherPlusModal = class extends SystemSwitcherModal {
        constructor(app, plugin) {
            super(app, plugin.options.builtInSystemOptions);
            this.plugin = plugin;
            plugin.options.shouldShowAlias = this.shouldShowAlias;
            const exKeymap = new SwitcherPlusKeymap(this.scope, this.chooser, this);
            this.exMode = new ModeHandler(app, plugin.options, exKeymap);
        }
        openInMode(mode) {
            this.exMode.setSessionOpenMode(mode, this.chooser);
            super.open();
        }
        onOpen() {
            this.exMode.onOpen();
            super.onOpen();
        }
        onClose() {
            super.onClose();
            this.exMode.onClose();
        }
        updateSuggestions() {
            const { exMode, inputEl, chooser } = this;
            exMode.insertSessionOpenModeCommandString(inputEl);
            if (!exMode.updateSuggestions(inputEl.value, chooser)) {
                super.updateSuggestions();
            }
        }
        onChooseSuggestion(item, evt) {
            if (!this.exMode.onChooseSuggestion(item, evt)) {
                super.onChooseSuggestion(item, evt);
            }
        }
        renderSuggestion(value, parentEl) {
            if (!this.exMode.renderSuggestion(value, parentEl)) {
                super.renderSuggestion(value, parentEl);
            }
        }
    };
    return new SwitcherPlusModal(app, plugin);
}

class SwitcherPlusPlugin extends obsidian.Plugin {
    async onload() {
        const options = new SwitcherPlusSettings(this);
        await options.loadSettings();
        this.options = options;
        this.addSettingTab(new SwitcherPlusSettingTab(this.app, this, options));
        this.registerCommand('switcher-plus:open', 'Open', Mode.Standard);
        this.registerCommand('switcher-plus:open-editors', 'Open in Editor Mode', Mode.EditorList, 'lucide-file-edit');
        this.registerCommand('switcher-plus:open-symbols', 'Open in Symbol Mode', Mode.SymbolList, 'lucide-dollar-sign');
        this.registerCommand('switcher-plus:open-workspaces', 'Open in Workspaces Mode', Mode.WorkspaceList, 'lucide-album');
        this.registerCommand('switcher-plus:open-headings', 'Open in Headings Mode', Mode.HeadingsList, 'lucide-file-search');
        this.registerCommand('switcher-plus:open-starred', 'Open in Starred Mode', Mode.StarredList, 'star');
        this.registerCommand('switcher-plus:open-commands', 'Open in Commands Mode', Mode.CommandList, 'run-command');
        this.registerCommand('switcher-plus:open-related-items', 'Open in Related Items Mode', Mode.RelatedItemsList, 'lucide-file-plus-2');
    }
    registerCommand(id, name, mode, iconId) {
        this.addCommand({
            id,
            name,
            icon: iconId,
            hotkeys: [],
            checkCallback: (checking) => {
                // modal needs to be created dynamically (same as system switcher)
                // as system options are evaluated in the modal constructor
                const modal = createSwitcherPlus(this.app, this);
                if (modal) {
                    if (!checking) {
                        modal.openInMode(mode);
                    }
                    return true;
                }
                return false;
            },
        });
    }
}

module.exports = SwitcherPlusPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL3NoYXJlZFR5cGVzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL3V0aWxzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL2Zyb250TWF0dGVyUGFyc2VyLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3N3aXRjaGVyUGx1c1NldHRpbmdzLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9zdGFycmVkU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL2NvbW1hbmRMaXN0U2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3JlbGF0ZWRJdGVtc1NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9nZW5lcmFsU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3dvcmtzcGFjZVNldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9lZGl0b3JTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3MvaGVhZGluZ3NTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3Mvc3ltYm9sU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3N3aXRjaGVyUGx1c1NldHRpbmdUYWIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvaGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy93b3Jrc3BhY2VIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL2VkaXRvckhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvaGVhZGluZ3NIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3N5bWJvbEhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvc3RhcnJlZEhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvY29tbWFuZEhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvcmVsYXRlZEl0ZW1zSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9zdGFuZGFyZEV4SGFuZGxlci50cyIsIi4uLy4uL3NyYy9zd2l0Y2hlclBsdXMvaW5wdXRJbmZvLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9tb2RlSGFuZGxlci50cyIsIi4uLy4uL3NyYy9zd2l0Y2hlclBsdXMvc3dpdGNoZXJQbHVzS2V5bWFwLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9zd2l0Y2hlclBsdXMudHMiLCIuLi8uLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiU2V0dGluZyIsIk1vZGFsIiwiUGx1Z2luU2V0dGluZ1RhYiIsIlBsYXRmb3JtIiwiS2V5bWFwIiwic2V0SWNvbiIsInJlbmRlclJlc3VsdHMiLCJub3JtYWxpemVQYXRoIiwiZnV6enlTZWFyY2giLCJWaWV3Iiwic29ydFNlYXJjaFJlc3VsdHMiLCJwcmVwYXJlUXVlcnkiLCJkZWJvdW5jZSIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQXNCQSxJQUFZLGlCQU1YLENBQUE7QUFORCxDQUFBLFVBQVksaUJBQWlCLEVBQUE7QUFDM0IsSUFBQSxpQkFBQSxDQUFBLGlCQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsTUFBSSxDQUFBO0FBQ0osSUFBQSxpQkFBQSxDQUFBLGlCQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsTUFBSSxDQUFBO0FBQ0osSUFBQSxpQkFBQSxDQUFBLGlCQUFBLENBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsWUFBVSxDQUFBO0FBQ1YsSUFBQSxpQkFBQSxDQUFBLGlCQUFBLENBQUEsb0JBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLG9CQUFrQixDQUFBO0FBQ2xCLElBQUEs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
