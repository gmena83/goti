
from playwright.sync_api import sync_playwright

def verify_goti_2_0():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")
        page.wait_for_load_state('networkidle', timeout=60000)
        page.screenshot(path="./verification/goti_2.0.png")
        browser.close()

if __name__ == "__main__":
    verify_goti_2_0()
