module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/styles/colors.scss";
                    @import "@/styles/animations.scss";
                `
            }
        }
    }
};
