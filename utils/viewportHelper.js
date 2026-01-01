const VIEWPORTS = {

        mobile: {
            name: "Mobile",
            width: 375,
            height: 667
        },

        tablet: {
            name: "Tablet",
            width: 768,
            height: 1024
        },

        desktop: {
            name: "Desktop",
            width: 1440,
            height: 900
        }
    };

    async function setViewport(driver, viewport) {
        if (!driver) {
            throw new Error("Webdriver instance is required for setViewport");
        }
        await driver.manage().window().setRect({
            width: viewport.width,
            height: viewport.height,
        });
        return viewport;
    }

    module.exports = {
        viewports: VIEWPORTS,
        setViewport,
    };