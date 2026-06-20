# Health First Africa

Health First Africa is a modern, responsive web application for a Non-Governmental Organization (NGO) dedicated to improving healthcare accessibility across Africa. The platform serves as a hub for sharing the organization `&#39;`s mission, showcasing impact, facilitating donations, and recruiting volunteers

## 🚀 Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Dynamic UI**: Smooth animations and transitions using Framer Motion.
- **Donation Integration**: Dedicated flow for supporters to contribute to the cause.
- **Information Sections**:
  - **About Us**: Organization history and values.
  - **Mission & Vision**: Clear articulation of the project `&#39;`s goals.
  - **Impact**: Showcasing real-world results and community reach.
  - **Gallery**: Visual representation of field work and events.
- **Engagement Tools**: Volunteer registration and contact forms.

## 🛠 Tech Stack

- **Core**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏃 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/healthfirstafrica.git
   ```

2. Navigate to the project directory:

   ```bash
   cd healthfirstafrica
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/              # App router pages and layouts
│   ├── components/   # Reusable UI components
│   ├── donate/       # Donation flow
│   ├── gallery/      # Image showcase
│   └── globals.css   # Global styles and Tailwind imports
├── public/           # Static assets (images, icons)
│   └── assets/       # Store all gallery images and videos here
```

## 🛠 Maintenance

### Adding Pictures and Videos

To update the gallery with new content, follow these steps:

1.  **Upload Assets**:
    - Place your new image or video files in the `public/assets/` directory.
    - _Tip_: Use consistent naming or descriptive names (e.g., `community-outreach-2026.jpg`).

2.  **Update the Gallery Page**:
    - Open `src/app/gallery/page.tsx`.
    - Locate the `galleryItems` array at the top of the file.
    - Add a new entry for your asset:
      ```javascript
      { type: "image", src: "/assets/your-new-image.jpg" },
      // OR for videos
      { type: "video", src: "/assets/your-new-video.mp4" },
      ```

3.  **Update the Homepage Gallery (Optional)**:
    - If you want to feature new images on the home page, open `src/app/components/Gallery.tsx`.
    - Update the `featuredImages` array with the paths to your new assets.

### Requirements for Images

- **Format**: Use `.jpg` or `.png` for photos and `.mp4` for videos.
- **Ratio**: The gallery uses an `aspect-[4/3]` ratio (Landscape). Images will be automatically cropped to fit this ratio, so try to use landscape-oriented photos for the best results.

## 📄 License

This project is licensed under the MIT License.
