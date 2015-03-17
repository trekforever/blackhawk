import Superagent from "superagent"
import Promise from "bluebird"

Superagent.Request.prototype.promise = function(options) {
  var req = this;
  var error;

  options = options || { cancellable: false };

  var promise = new Promise(function(resolve, reject) {
      req.end(function(err, res) {
        if (typeof res !== "undefined" && res.status >= 400) {
          var msg = 'cannot ' + req.method + ' ' + req.url + ' (' + res.status + ')';
          error = new Error(msg);
          error.status = res.status;
          error.body = res.body;
          error.res = res;
          reject(error);
        } else if (err) {
          reject(new Error(err));
        } else {
          resolve(res);
        }
      });
    });

  if (options.cancellable) {
    promise = promise
      .cancellable()
      .catch(Promise.CancellationError, function(e) {
        req.abort();
        throw e;
    });
  }

  return promise;
};

export default Superagent;