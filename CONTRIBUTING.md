# 🤝 Contributing to Bagnolesi nel Mondo

Thank you for your interest in contributing to the project! We welcome community contributions to help connect the global Bagnolesi diaspora. 

Please take a moment to review this guide to make the contribution process smooth for everyone.

---
## 🛑 Code of Conduct
By participating in this project, you agree to abide by our community standards:
* Be respectful and welcoming to all contributors.
* Focus on constructive feedback and collaboration.
* Keep discussions relevant to the community and heritage goals of the project.

---
### 🗄️ Database Setup for Contributors

This project uses **MongoDB** to handle data models. To test your changes locally:

1. **Install MongoDB Community Server** locally, or set up a free sandbox cluster on [MongoDB Atlas](https://mongodb.com).
2. **Create a local environment file:** 
   Copy the `.env.example` file (if provided) or create a new file named `.env` in the root folder.
3. **Add your connection string:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/bagnolesi_dev
   PORT=3000
   ```
4. **Never commit the `.env` file:** Ensure `.env` is listed inside your `.gitignore` file so your personal connection credentials are never pushed back to GitHub!

## 🛠️ How Can I Contribute?

### 1. Reporting Bugs
If you find a bug or something broken on the website:
* Check the **Issues** tab on GitHub to ensure it hasn't already been reported.
* Open a new Issue and describe the problem clearly.
* Include steps to reproduce the bug and screenshots if possible.

### 2. Suggesting Features
Have an idea to make the website better? 
* Open an Issue and label it as a `feature request`.
* Explain the concept and how it benefits the Bagnolesi community platform.

### 3. Submitting Code Changes (Pull Requests)
Ready to write some code? Please follow this workflow:

1. **Fork** the repository to your own GitHub account.
2. **Clone** your fork locally and navigate into the folder:
   ```bash
   git clone https://github.com
   cd Bagnolesi-nel-Mondo
   ```
3. Create a new **feature branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your code edits (ensure you test your changes locally using `npm start`).
5. **Commit** your changes with a clear message:
   ```bash
   git commit -m "Add feature: described your changes here"
   ```
6. **Push** the branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a **Pull Request (PR)** against our `main` branch.

---
## 🎨 Coding Guidelines

To keep the application clean and maintainable, please follow these guidelines:
* **Architecture:** Maintain the Model-View-Controller (MVC) structure. Place server logic in routes/controllers, database schemas in `models`, and frontend layouts in `views` (EJS).
* **Environment Variables:** Never commit your local `.env` database connection strings or secrets to GitHub. 
* **Styling:** Follow the existing TailwindCSS / CSS patterns established in the `public` folder.

Thank you for helping build this community network! 🌍
