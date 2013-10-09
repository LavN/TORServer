window.BachelorLayout = LayoutView.extend {
  template: "bachelor_page"
}
  
$ ->
  window.bachelor_page = new BachelorLayout
  app_layout.add bachelor_page