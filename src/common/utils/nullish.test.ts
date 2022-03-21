import * as Nullish from "./nullish";

describe("Nullish", () => {
    test("isNotNullish", () => {
        expect(Nullish.isNotNullish(undefined)).toBeFalsy();
        expect(Nullish.isNotNullish(null)).toBeFalsy();
    });
    test("assertNotNullish", () => {
        expect(() => Nullish.assertNotNullish(undefined)).toThrowError(
            "value is nullish"
        );
        expect(() => Nullish.assertNotNullish(null)).toThrowError(
            "value is nullish"
        );
    });
});
