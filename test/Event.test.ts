import { Event } from '../src/Event';


describe("Event", function() {
  describe("#constructor", function() {
    it("should create", function(done) {
      const type = "test";
      const data = {stuff:"stuff"};
      const time = 1000;
      const event = new Event(type, data, time);

      expect(event.type).toBe(type);
      expect(event.data.stuff).toBe(data.stuff);
      expect(event.time).toBe(time);
      done();
    });
    it("should use default time", function(done) {
      const type = "test";
      const data = {stuff:"stuff"};
      const event = new Event(type, data);

      expect(event.type).toBe(type);
      expect(event.data.stuff).toBe(data.stuff);
      expect(event.time).toBeTruthy();
      done();
    });
  });
});
