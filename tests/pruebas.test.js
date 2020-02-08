const axios = require("axios");
const funciones = require("../javaScript/scripts");

jest.mock("axios");
global.axios = axios;

describe("scripts", () => {
  describe("validateName", () => {
    test("should return false on a name longer than 50 char", () => {
      const input =
        "Maria Magdalena Maria Magdalena Maria Magdalena Maria Magdalena Maria Magdalena";

      expect(funciones.validateName(input)).toBe(false);
    });
    test("should return true on a valid name", () => {
      const input = " Maria Magdalena";
      expect(funciones.validateName(input)).toBe(true);
    });
    describe("validate address", () => {
      test("should return false on an address longer than 60 char", () => {
        const input =
          "Maria Magdalena1 Maria Magdalena1 Maria Magdalena1 Maria Magdalena1 Maria Magdalena1 Maria Magdalena1";
        expect(funciones.validateAddress(input)).toBe(false);
      });
      test("should return true on an valid address", () => {
        const input = "felipe vallese 1080";
        expect(funciones.validateAddress(input)).toBe(true);
      });
    });

    describe("validateEmail", () => {
      test("should return false on an invalid email ", () => {
        const input = "maria";
        const input2 = "maria@";
        expect(funciones.validateEmail(input)).toBe(false);
        expect(funciones.validateEmail(input2)).toBe(false);
      });
      test("should return true on valid email", () => {
        const input = "maria_kpa@mail.com";
        expect(funciones.validateEmail(input)).toBe(true);
      });
    });
    describe("isNumeric", () => {
      test("should return false on a non numeric string", () => {
        const input = "Hola uacho";
        expect(funciones.isNumeric(input)).toBe(false);
      });
      test("should return true on a numeric string", () => {
        const input = "01234567";
        expect(funciones.isNumeric(input)).toBe(true);
      });
    });
  });
});
describe("isValid", () => {
  test("should return true on valid employee", () => {
    const empleado = {
      fullname: "Roberto Perez",
      email: "mailderoberto@mail.com",
      address: "casaRobert 2020",
      phone: "011333445"
    };
    expect(funciones.isEmployeeValid(empleado)).toBe(true);
  });
});

describe("putEmployee", () => {
  test("should return correctly", () => {
    const empleado = {
      fullname: "Roberto Perez",
      email: "mailderoberto@mail.com",
      address: "casaRobert 2020",
      phone: "011333445"
    };
    const resp = { data: empleado };
    axios.put.mockResolvedValue(resp);

    funciones
      .putEmployee(1, empleado)
      .then(res => res.data)
      .then(data => expect(data).toEqual(empleado));
  });
});

describe("delete Employee", () => {
  test("should return correctly", () => {
    const empleado = {
      fullname: "Roberto Perez",
      email: "mailderoberto@mail.com",
      address: "casaRobert 2020",
      phone: "011333445"
    };
    const mockPost = jest.fn();
    axios.post = mockPost;

    funciones.postearEmployee(empleado);
    expect(mockPost).toHaveBeenCalledWith(`${funciones.baseUrl}/users`,empleado);
  });
});
