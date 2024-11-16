// eslint-disable-next-line n/no-unsupported-features/node-builtins -- for the lulz
import { describe, test } from "node:test";
import assert from "node:assert";
import { reverse } from "../utils/for_testing.js";

describe("reverse", () => {
    test("reverse of a", () => {
        const res = reverse("a");

        assert.strictEqual(res, "a");
    });

    test("reverse of react", () => {
        const result = reverse("react");

        assert.strictEqual(result, "tcaer");
    });

    test("reverse of saippuakauppias", () => {
        const result = reverse("saippuakauppias");

        assert.strictEqual(result, "saippuakauppias");
    });
});
