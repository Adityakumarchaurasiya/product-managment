
````markdown
# Product Management – Interactive UI

## Overview
A responsive and interactive frontend application to manage products.

Features:
- Add, Edit, Delete Products
- List View and Card View
- Real-time Search with debounce
- Pagination with adjustable items per page
- Sorting by Name (A–Z) and Price (Low→High / High→Low)
- Persistent data using LocalStorage
- Toast notifications instead of alert/confirm
- Dark Mode toggle
- Export product data to JSON / CSV
- Interactive UI with animations and responsive design

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)

## Installation & Usage
1. Clone the repository:
```bash
git clone https://github.com/yourusername/product-management-ui.git
````

2. Open `index.html` in any browser.
3. Interact with the UI to add/edit/delete products.
4. Use controls to sort, paginate, switch views, toggle dark mode, and export data.

## File Structure

```
product-management-ui/
├── index.html       # Main HTML file
├── style.css        # Optional CSS file
├── script.js        # Optional JS file
├── README.md        # Project documentation
└── assets/          # Images or icons if any
```

## Deployment

* Can be hosted on **Netlify**, **Vercel**, or **GitHub Pages**.
* Simply upload the repository or link your GitHub repo in the platform.

## Testing

* Unit tests are embedded in the UI at the bottom.
* Checks:

  * Validation fails for empty input
  * Product addition increases product list length

## Screenshot

*(Add a screenshot of your UI here for GitHub README)*

## License

MIT License

```
```
