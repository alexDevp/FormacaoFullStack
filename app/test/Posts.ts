process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";

let Post;

let should = chai.should();

chai.use(chaiHttp);

describe("Posts", () => {
  /*
   * Test the /GET route
   */
  describe("/GET post", () => {
    it("it should GET all the Posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
