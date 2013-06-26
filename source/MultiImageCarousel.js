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

    getBufferRange: function()
    {
        var range = [];
        if (this.layout.containerBounds)
        {
            var prefetchRange = 1;
            var bounds = this.layout.containerBounds;
            var m, img, c, i, x, xEnd;
            // get the lower range
            i = this.index - 1;
            x = 0;
            xEnd = bounds.width * prefetchRange;
            while (i >= 0 && x <= xEnd)
            {
                c = this.$["container" + i];
                x += c.width + c.marginWidth;
                range.unshift(i);
                i--;
            }
            // get the upper range
            i = this.index;
            x = 0;
            xEnd = bounds.width * (prefetchRange + 1);
            while (i < this.images.length && x <= xEnd)
            {
                c = this.$["container" + i];
                x += c.width + c.marginWidth;
                range.push(i);
                i++;
            }
        }
        return range;
    },

    previous: function()
    {
        if (this.index > 0)
        {
            this.setIndex(this.index - 1);
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
