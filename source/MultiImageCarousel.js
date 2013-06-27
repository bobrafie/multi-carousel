/**
    _MultiImageCarousel_ is an _enyo.ImageCarousel_ configurable to display a specific number of thumbnails.
*/

enyo.kind(
{
    name: "MultiImageCarousel",
    kind: enyo.ImageCarousel,

    thumbnailsCount: 1,

    initContainers: function()
    {
        var imageWidth = 100 / this.thumbnailsCount;

        for (var i = 0; i < this.images.length; i++)
        {
            if (!this.$["container" + i])
            {
                this.createComponent(
                {
                    name: "container" + i,
                    style: "height:100%; max-width:" + imageWidth + "%; min-width:" + imageWidth + "%;"
                });
                this.$["container" + i].render();
            }
        }
        for (i = this.images.length; i < this.imageCount; i++)
        {
            if (this.$["image" + i])
            {
                this.$["image" + i].destroy();
            }
            this.$["container" + i].destroy();
        }
        this.imageCount = this.images.length;
    },

    previous: function()
    {
        if (this.index > 0)
        {
            if (this.index > this.imageCount - this.thumbnailsCount)
            {
                this.setIndex(this.imageCount - this.thumbnailsCount - 1);
            }
            else
            {
                this.setIndex(this.index - 1);
            }
        }
    },

    next: function()
    {
        if (this.index < this.imageCount - this.thumbnailsCount)
        {
            this.setIndex(this.index + 1);
        }
    }
});
