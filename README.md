# ClubHub — College Club Management System

## 1. Project Overview
ClubHub is a clean MERN stack classroom project built for college club management. It provides simple, independent management of four core resources: Members, Clubs, Meetings, and Announcements. The application enables users to create, view, update, and delete records for each resource through a responsive React frontend communicating with an Express REST API and a MongoDB database.

## 2. Technologies Used
- **Frontend:** React, Vite, React Router, JavaScript, HTML, CSS (Fetch API)
- **Backend:** Node.js, Express.js, CORS
- **Database:** MongoDB, Mongoose

## 3. Project Structure
```text
clubhub/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── middleware/
│   │   └── logger.js
│   ├── routes/
│   │   ├── memberRoutes.js
│   │   ├── clubRoutes.js
│   │   ├── meetingRoutes.js
│   │   └── announcementRoutes.js
│   └── models/
│       ├── Member.js
│       ├── Club.js
│       ├── Meeting.js
│       └── Announcement.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── MemberCard.jsx
│       │   ├── ClubCard.jsx
│       │   ├── MeetingCard.jsx
│       │   └── AnnouncementCard.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Members.jsx
│           ├── Clubs.jsx
│           ├── Meetings.jsx
│           └── Announcements.jsx
└── README.md
```

## 4. Install Steps

### Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd clubhub/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```

### Frontend
1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd clubhub/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 5. Database Requirement
MongoDB must be running locally on the default port: `mongodb://127.0.0.1:27017/clubhub`.

## 6. API Endpoints

### Members
- `GET /api/members` - Retrieve all members (supports query parameters: `?club=Robotics` and `?club=Robotics&year=2`)
- `GET /api/members/:id` - Retrieve a member by ID
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member by ID
- `DELETE /api/members/:id` - Delete a member by ID

### Clubs
- `GET /api/clubs` - Retrieve all clubs
- `GET /api/clubs/:id` - Retrieve a club by ID
- `POST /api/clubs` - Create a new club
- `PUT /api/clubs/:id` - Update a club by ID
- `DELETE /api/clubs/:id` - Delete a club by ID

### Meetings
- `GET /api/meetings` - Retrieve all meetings
- `GET /api/meetings/:id` - Retrieve a meeting by ID
- `POST /api/meetings` - Create a new meeting
- `PUT /api/meetings/:id` - Update a meeting by ID
- `DELETE /api/meetings/:id` - Delete a meeting by ID

### Announcements
- `GET /api/announcements` - Retrieve all announcements
- `GET /api/announcements/:id` - Retrieve an announcement by ID
- `POST /api/announcements` - Create a new announcement
- `PUT /api/announcements/:id` - Update an announcement by ID
- `DELETE /api/announcements/:id` - Delete an announcement by ID

## 7. MERN Architecture
```text
React → fetch() → Express → Mongoose → MongoDB → JSON → React state → UI
```

The frontend uses the native Fetch API to communicate with Express routes. Express uses Mongoose models to query and update the MongoDB database, returning JSON responses that update React component state to re-render the user interface.

## 8. Concepts Demonstrated
- **JSX:** XML-like syntax extension for JavaScript used to describe UI structure.
- **Components:** Capitalized reusable modular UI building blocks.
- **Props:** Unidirectional data passing from parent components to child components.
- **State (`useState`):** Reactive state holding lists, form fields, loading, and error states.
- **Events:** Event listeners (`onClick`, `onChange`, `onSubmit` with `preventDefault`).
- **Forms:** Controlled inputs bound to React state.
- **Conditional Rendering:** Displaying loading, error, empty, and data states using `&&` and ternary operators.
- **`map()`:** Rendering dynamic lists of components using unique MongoDB `_id` values as keys.
- **`useEffect`:** Performing side effects (fetching API data on initial render with `[]` dependency array).
- **React Router:** Client-side routing between pages without full page reloads.
- **Fetch API:** Asynchronous HTTP requests to backend REST API endpoints.
- **Node.js:** JavaScript runtime environment executing backend code.
- **Express:** Minimal web framework handling HTTP routing and middleware.
- **Middleware:** Functions processing requests before routes (JSON parser, CORS, custom logger).
- **REST API:** Standardized HTTP API architecture.
- **CRUD:** Complete Create, Read, Update, Delete operations for all resources.
- **`req.body`:** Extracting payload data sent via POST and PUT requests.
- **`req.params`:** Extracting URL route parameters (e.g. `:id`).
- **`req.query`:** Extracting URL query string parameters for filtering.
- **MongoDB:** NoSQL document database storing collections.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Schema:** Definition of document shape, fields, and constraints.
- **Model:** Mongoose constructor compiled from schema providing database query methods.
