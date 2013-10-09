window.NewsBlockCollectionView = CollectionView.extend({
  model_view: NewsBlockModelView,
  template: "news_block",
  __render: function(){
    var mv = this.model_view;
    this.collection.each(function(mod){ this.$el.append((new mv(mod)).$el); })
  }
})
  
  
