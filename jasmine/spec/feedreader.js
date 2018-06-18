/* feedreader.js */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have URL\'s', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have names', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            });
        });
    });

    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        const body = document.querySelector('body');
        const menuIcon = document.querySelector('.menu-icon-link');
        const slide = document.querySelector('.slide-menu');

        /* Write a test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            const num = parseInt(window.getComputedStyle(slide).getPropertyValue('left'));
            expect(num).toBeLessThan(-191);
            expect(body.classList).toContain('menu-hidden');
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when icon is clicked', function() {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        const feed = document.querySelector('.feed .entry');

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('makes sure there is at least one entry in feed container after load', function() {
            expect(feed).toBeDefined();
        });
    });
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let prevUrl;
        let newUrl;
        const feed = document.querySelector('.feed');

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                prevUrl = feed.children[0].getAttribute('href');
            });
            loadFeed(1, function() {
                newUrl = feed.children[1].getAttribute('href');
                done();
            });
        });

        it('ensures that this content actually changes', function() {
            expect(prevUrl).not.toBe(newUrl);
        });
    });
}());
