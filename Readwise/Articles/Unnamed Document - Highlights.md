![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[lateblt.tripod.com]]
- Full Title: Unnamed Document
- Category: #articles
- URL: https://lateblt.tripod.com/bit68.txt?utm_source=tldrnewsletter

## Highlights
- Generally, when a CPU chip first receives power, it must be reset by
  receiving a pulse on its RESET (or RST) pin. This is because when the power
  supply is first powering up, even if it only takes a second or two, the CPU
  has already received "dirty" power, because the power supply was building up
  a steady stream of electricity. Digital logic chips like CPUs require precise
  voltages, and they get confused if they receive something outside their
  intended voltage range. Thus, as soon as the chip has powered up, it is reset
  to bring it to a known starting condition. This is done automatically by
  circuitry on the motherboard that performs a reset upon power-up. The RESET
  pin (which is usually active-low) must be activated for a certain number of
  clock cycles to reset the CPU. The reset circuit keeps the RESET signal
  active for a moment, then disables it, at which point the CPU begins its act. ([View Highlight](https://read.readwise.io/read/01gqsg194namjjqjf7kgwa06zt))
^rwID-464396396
- It simply
  executes instructions from memory. Ultimately, all the CPU really is, is a
  chip which receives instructions, and then performs those instructions. ([View Highlight](https://read.readwise.io/read/01gqsg1xby39vxr45gp0m53per))
^rwID-464396412
- The RAM is the CPU's workspace, where
  it temporarily stores data that it is currently working on. ([View Highlight](https://read.readwise.io/read/01gqsg2v940z3mwe29kjbny8n5))
^rwID-464397365
- The ROM is the
  permanent code that the CPU reads every time it is turned on; The ROM is
  always the first code to get executed on the CPU. ([View Highlight](https://read.readwise.io/read/01gqsg3hs1e9hhjg1tz2ywh5r1))
^rwID-464398016
- The CPU addresses memory
  (both RAM and ROM) through the address bus, sending out a particular
  combination of 1s and 0s on the address bus lines to choose a particular byte
  of memory. The memory chips respond by sending the contents of the selected
  memory cell over the data bus to the CPU. ([View Highlight](https://read.readwise.io/read/01gqsg407han7xgpw7bx6d9kpr))
^rwID-464398207
- Every CPU has a particular point in memory where it begins reading
  instructions after it has been reset. Some CPUs will simply jump to a set
  point and begin executing the instructions there, while others actually use
  what is called a "reset vector", which means that it first checks a
  particular point in memory for a number which is the memory address to begin
  executing instructions at. ([View Highlight](https://read.readwise.io/read/01gqsg6mvdkz53r22yrz5r52k8))
^rwID-464398655
- As an example of this, the Z80 CPU immediately begins executing code from
  memory address 0000 when it is reset. ([View Highlight](https://read.readwise.io/read/01gqsgd1nz13rgs6cyk3c3f4sa))
^rwID-464402437
- By
  contrast, the 6502, another popular classic CPU, has a two-byte reset vector
  located at memory addresses FFFC and FFFD (in hexadecimal). This means that
  the ROM in a 6502-based computer *must* be at the top of the memory space.
  The two bytes are stored backwards, and thus, if FFFC contains 00 and FFFD
  contains B0, then the 6502 will jump to memory location B000 and start
  executing instructions there ([View Highlight](https://read.readwise.io/read/01gqsgdyde87p4q44k99h6avck))
^rwID-464403504
- There are two advantages to this system: First
  of all, it gives the computer engineer some control over where the CPU begins
  executing ROM code, and secondly, it leaves the bottom area of the memory
  space (beginning at address 0000) free for RAM. ([View Highlight](https://read.readwise.io/read/01gqsgfhcs0y3ctp9wvp45b8mh))
^rwID-464403611
- The CPU contains a register called the instruction pointer (abbreviated IP)
  which contains a number. The number in the IP is the memory address at which
  the next instruction is to be performed. IP is incremented with each
  instruction, and in the event of a JMP instruction (a jump instruction, which
  tells the CPU to jump to another location and start running the instructions
  there), IP is set to the jump location and then the CPU continues on its way
  from there. ([View Highlight](https://read.readwise.io/read/01gqsgj529ja9v27777c82h0qh))
^rwID-464403798
- The CPU's instructions are sometimes called "opcodes". They are
  simply strings of binary 1s and 0s which together form an instruction ([View Highlight](https://read.readwise.io/read/01gqsgk0v4j015ehtnbzt1qhp0))
^rwID-464403830
- on a standard Intel 80x86 CPU (such as a 486 or Pentium), the opcode
  90h (or 10010000 binary) is a NOP (no operation) opcode. NOP is the simplest
  instruction in any CPU, and it simply means to do nothing and go on to the
  next instruction ([View Highlight](https://read.readwise.io/read/01gqsgw4waz7gfje6z5xvqq81q))
^rwID-464406751
- Regardless of where the CPU begins getting its instructions, the beginning
  point should always be somewhere in a ROM chip. The computer needs startup
  instructions to perform basic hardware checking and preparation, and these
  are contained in a ROM chip on the motherboard called the BIOS. This is where
  any computer begins executing its code when it is turned on. ([View Highlight](https://read.readwise.io/read/01gqsh33n9pkmdbtwp2czw5906))
^rwID-464407405
- Once the BIOS code has been executed, what happens next depends entirely on
  what is in the BIOS, although normally the BIOS will begin looking for a disk
  drive of some kind and start executing the instructions there (which is
  usually an operating system). ([View Highlight](https://read.readwise.io/read/01gqsh5vfrb76a3wy0qwhc2sam))
^rwID-464407543
- How do the chips know when the CPU is addressing them, and when
  it is not? A very popular solution to this is to use a converter chip,
  usually a 3-to-8 converter, and occasionally a 2-to-4 converter is used. ([View Highlight](https://read.readwise.io/read/01gqsh7tmnjh7gsdz3ehaca4ee))
^rwID-464407803
- The 3-to-8 converter is simply a chip with three logic inputs and eight logic
  outputs. Depending on which combination of inputs is on, a single of the
  eight outputs will be activated ([View Highlight](https://read.readwise.io/read/01gqsh8t0hse279dvwzfpars1e))
^rwID-464407850
- The three inputs
  are attached to the highest three lines of the address bus (A13 to A15 in a
  CPU with a 16-bit address bus), and the eight outputs can now be used as chip
  select signals. Very nearly every RAM or ROM chip in existence has a "Chip
  Select" (CS) pin, which can enable or disable the chip, and whichever chip
  receives the CS signal from the 3-to-8 converter will be the one that
  responds to the memory access by the CPU. ([View Highlight](https://read.readwise.io/read/01gqshd2hqeb1rctskqb37dwwn))
^rwID-464408228
