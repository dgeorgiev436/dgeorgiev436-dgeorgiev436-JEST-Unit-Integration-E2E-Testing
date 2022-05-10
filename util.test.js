const puppeteer = require("puppeteer")
const {generateText, checkAndGenerate} = require("./util")

// Test the output for specific arguments
test("should output name and age", () => {
	
	const text = generateText("Max", 29);
	expect(text).toBe("Max (29 years old)");
	
	const text2 = generateText("Denis", 25);
	expect(text2).toBe("Denis (25 years old)");
});

// Second test to check same function with different arguments
test("Should output data-less test", () => {
	const text = generateText("", null);
	expect(text).toBe(" (null years old)")
})

test("should generate a valid text output", () => {
	
	const text = checkAndGenerate("Max", 29);
	expect(text).toBe("Max (29 years old)");
});

// E2E test
test("Should click around", async() => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 80,
		args: ["--window-size=1920,1080"]
	});
	
// 	Run a browser
	const page = await browser.newPage();
	await page.goto();
// 	Execute testing logic for name and age fields
// 	Select and fill name field
	await page.click("input#name");
	await page.type("input#name", "Anna");
// 	Select and fill age field
	await page.click("input#age");
	await page.type("input#age", "24");
// 	Click submit button
	await page.click("#btnAddUser");
// 	Check the text from the list and test validity
	const finalText = await page.$eval(".user-item", el => el.textContent);
	expect(finalText).toBe("Anna (24 years old)");
	
}, 10000);