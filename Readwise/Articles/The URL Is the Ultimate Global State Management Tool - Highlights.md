![rw-book-cover](https://www.jacobparis.com/generators/blog.png?title=The%2520URL%2520is%2520the%2520ultimate%2520global%2520state%2520management%2520tool&description=Information%2520in%2520the%2520URL%2520can%2520power%2520server-side%2520rendering.%2520Use%2520query%2520params%2520for%2520searches%2520and%2520filters.%2520Use%2520back%2520buttons%2520to%2520close%2520modals.%2520Retain%2520your%2520page%2520number%2520when%2520you%2520refresh.&date=2023-04-25&img=)

## Metadata
- Author: [[Jacob Paris]]
- Full Title: The URL Is the Ultimate Global State Management Tool
- URL: https://www.jacobparis.com/guides/url-as-state-management

## Highlights
- Go to Airbnb, open a listing, and in your browser console, open `new URL(window.location.href)`.
  You'll get an object that looks something like this
  href: https://www.airbnb.com/rooms/12345678?adults=1&children= ([View Highlight](https://read.readwise.io/read/01h026tm27at90r4xn6evg8ekt))
- Each page contains a small booking form, where you can enter your information and get a price quote. ([View Highlight](https://read.readwise.io/read/01h026tse1we51xwj1f207932m))
- What should happen when a user refreshes the page? Should the form be cleared, ready for them to enter their information again? If we want to pre-fill the form with the information they've already entered, storing it in the URL isn't the only way. It could be part of local storage, or a cookie, or in a database. ([View Highlight](https://read.readwise.io/read/01h026ttj6twx553nz25n24vc2))
- But people also share prospective bookings with other people. If I'm planning a trip with a friend, I can send them a link to the listing I'm looking at, and they'll see the same price quote I'm seeing, with the same dates and number of guests. ([View Highlight](https://read.readwise.io/read/01h026txpv88rhgk7nedgs6c8s))
- No other state management tool achieves the sharability of state that the URL does. ([View Highlight](https://read.readwise.io/read/01h026v255qwdfxmybwsh7ez9t))
- This has important usability implications. If you're on a page, and you click a link to go to another page, and then you hit the back button, you expect to go back to the page you were on before you clicked the link. ([View Highlight](https://read.readwise.io/read/01h026vjagbg3v1rgqed2v0pmh))
- All web applications should be built with the understanding that history navigation is part of the user interface. ([View Highlight](https://read.readwise.io/read/01h026wbfm86zmch8crgpsg87g))
- Modal popup dialogs can be a useful way to show additional information to users, without taking them away from the page they're on. ([View Highlight](https://read.readwise.io/read/01h026ww170zapdnfchfe5fk7z))
- On smaller screens, there is rarely enough space to show a modal and the page content at the same time, so many websites make the modal take up the whole screen, which looks like a new page to the user. ([View Highlight](https://read.readwise.io/read/01h02731c860fhcw7hx3r3sa92))
- For this reason, it's important that the modal can be closed by hitting the back button. Mobile users will often swipe left to trigger their device's back navigation. If you take them to the previous page instead of closing the modal, they'll be confused and feel like they just went back 2 pages. ([View Highlight](https://read.readwise.io/read/01h027326f02e5bd5v8396pjmb))
- If the user should be able to bookmark the modal, or share it with someone else, then it should have its own URL. It's not important whether this is part of the pathname like `/issues/edit` or a query parameter like `/issues?modal=edit`, as long as it's in the URL. ([View Highlight](https://read.readwise.io/read/01h0273f7xj05mw62m69cfrvym))
- If the modal is relevant to the user, but not to anyone else, then you may want a URL that doesn't share the modal. ([View Highlight](https://read.readwise.io/read/01h0273sjdvzz3wbpmv53j2kt2))
- Instead of a query param, you can use [Location State](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) to store whether the modal is open or closed without it being part of the URL. ([View Highlight](https://read.readwise.io/read/01h0274v8myncacvw42kfhen9s))
- This state is still stored in the browser history. Forward, back, and "re-open closed tab" will all work as expected. ([View Highlight](https://read.readwise.io/read/01h0274pz6a6mcntymzhj7t362))
- The back button should always take the user to the previous logical state. Pressing the back button to close a modal makes sense, and pressing it again should take them to the previous page. ([View Highlight](https://read.readwise.io/read/01h0277gx3nakqc3rsymgv4spb))
