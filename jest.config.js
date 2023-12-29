module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/_tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    coverageReporters: ["json", "lcov", "text", "clover"]
}
