// eslint-disable-next-line n/no-unsupported-features/node-builtins -- for the lulz
import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

describe("dummy", () => {
    test("dummy returns one", () => {
        const blogs = [];

        const result = listHelper.dummy(blogs);

        assert.strictEqual(result, 1);
    });
});
