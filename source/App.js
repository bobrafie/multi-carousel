enyo.kind(
{
	name: 'App',
	kind: 'FittableRows',
	classes: 'enyo-fit',
	components: [
		{
			kind: 'onyx.Toolbar',
			style: 'text-align:center;',
			components: [
				{
					kind: 'onyx.Button',
					content: '&larr;',
					allowHtml: true,
					ontap: 'previous'
				},
				{
					kind: 'onyx.Button',
					content: '&rarr;',
					allowHtml: true,
					ontap: 'next'
				},
				{
					kind: 'onyx.Button',
					content: 'Random',
					allowHtml: true,
					ontap: 'getRandomImage'
				},
				{
					kind: 'onyx.InputDecorator',
					classes: 'hidden',
					components: [
						{
							name: 'carouselIndexInput',
							kind: 'onyx.Input',
							value: '0',
							onchange: 'updateIndex'
						}
					]
				}
			]
		},
		{
			name: 'carousel',
			kind: 'MultiImageCarousel',
			classes: 'carousel',
			fit: false,
			ontap: 'showImage',
			onTransitionStart: 'transitionStart',
			onTransitionFinish: 'transitionFinish',
			disableZoom: true,
			thumbnailsCount: 5
		},
		{
			name:'imagePanel',
			kind:'Image',
			classes:'image',
			src:'',
		}
	],
	
	create: function()
	{
		this.inherited(arguments);
		this.urls = [
				'http://nightly.enyojs.com/latest/sampler/assets/mercury.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/venus.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/earth.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/mars.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/jupiter.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/saturn.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/uranus.jpg',
				'http://nightly.enyojs.com/latest/sampler/assets/neptune.jpg'
		];

		this.$.carousel.setImages(this.urls);
	},
	
	transitionFinish: function(inSender, inEvent)
	{
		if (this.$.carouselIndexInput)
		{
			if (inEvent.toIndex <= this.$.carousel.imageCount - this.$.carousel.thumbnailsCount)
			{
				this.$.carouselIndexInput.setValue(inEvent.toIndex);
			}
		}
	},
	
	previous: function(inSender, inEvent)
	{
		this.$.carousel.previous();
	},
	
	next: function(inSender, inEvent)
	{
		this.$.carousel.next();
	},
	
	showImage: function(inSender, inEvent) {
		var src = inEvent.target.src;

		if (src != undefined) {
			this.$.imagePanel.setAttribute('src', src);
		}
	},
	
	getRandomImage: function()
	{
		var i = this.getRandomIndex();
		
		this.$.carousel.setIndex(parseInt(i));
		this.$.imagePanel.setAttribute('src', this.$.carousel.images[this.$.carousel.index]);
	},
	
	getRandomIndex: function()
	{
		var i = Math.floor(Math.random() * this.$.carousel.images.length);
		while (i == this.$.carousel.index)
		{
			i = Math.floor(Math.random() * this.$.carousel.images.length);
		}
		return i;
	},
	
	updateIndex: function(inSender, inEvent)
	{
		var index = this.trimWhitespace(this.$.carouselIndexInput.getValue());
		if (index === '' || isNaN(index))
		{
			return;
		}
		this.$.carousel.setIndex(parseInt(index, 10));
	},
	
	trimWhitespace: function(inString)
	{
		return inString.replace(/^\s+|\s+$/g, '');
	}
});
