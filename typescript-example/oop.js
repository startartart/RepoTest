var Employee = /** @class */ (function () {
  function Employee(_empName, _age, _empJob) {
    var _this = this;
    this._empName = _empName;
    this._age = _age;
    this._empJob = _empJob;
    this.printEmp = function () {
      console.log(
        _this._empName +
          '의 나이는' +
          _this._age +
          '이고, 직업은' +
          _this._empJob +
          '입니다.'
      );
    };
    // this._empName = _empName;
    // this._age = _age;
    // this._empJob = _empJob;
  }
  Object.defineProperty(Employee.prototype, 'empName', {
    get: function () {
      return this._empName;
    },
    set: function (val) {
      this._empName = val;
    },
    enumerable: false,
    configurable: true,
  });
  return Employee;
})();
var employee1 = new Employee('park', 26, '개발자');
employee1.empName = 'yes';
employee1.printEmp();
