describe("ImageElement", function() {
  var imageElement, calledRenderImage;
  beforeEach(function() {
    calledRenderImage = false;
    imageElement = new shaunlusk.ImageElement(
      shaunlusk.Mocks.getMockScreen(),
      shaunlusk.Mocks.getMockLayer(),
      {
        imageRenderer : {
          renderImage : function() {
            calledRenderImage = true;
          }
        }
      }
    );
  });
  describe("#render()", function() {
    it("should return if hidden", function(done) {
      imageElement.hide();

      imageElement.render(1, 1);

      assert(calledRenderImage === false, "should not have called renderImage");
      done();
    });
    it("should return if not dirty", function(done) {
      imageElement.setDirty(false);

      imageElement.render(1, 1);

      assert(calledRenderImage === false, "should not have called renderImage");
      done();
    });
    it("should call renderImage", function(done) {
      imageElement.render(1, 1);

      assert(calledRenderImage === true, "should have called renderImage");
      done();
    });
    it("should call base class render", function(done) {
      var calledBaseRender = false;
      var savedFn = shaunlusk.GfxElement.prototype.render;
      shaunlusk.GfxElement.prototype.render = function() {
        calledBaseRender = true;
      };
      imageElement.render(1, 1);

      assert(calledBaseRender === true, "should have called base render");
      shaunlusk.GfxElement.prototype.render = savedFn;
      done();
    });
  });
});
