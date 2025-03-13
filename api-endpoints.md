# Urban Uplift API Endpoints

## Base URL

```
http://localhost:3000/api
```

## Workflow

1. First, classify the issue using the description
2. Use the returned category when creating the report
3. Optionally include an image URL from Cloudinary

## 1. Issue Classification

### Classify Issue

```http
POST /issues/classify
```

**Request Body:**

```json
{
  "description": "There is a large pothole on Main Street that's causing traffic problems"
}
```

**Response:**

```json
{
  "category": "pothole",
  "confidence": 0.89
}
```

## 2. Reports Management

### Get All Reports

```http
GET /reports
```

**Response:**

```json
[
  {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "description": "Large pothole causing traffic issues",
    "category": "pothole",
    "status": "pending",
    "location": "12.9716, 77.5946",
    "imageUrl": "https://res.cloudinary.com/your-cloud-name/image.jpg",
    "createdAt": "2024-03-15T10:30:00Z",
    "updatedAt": "2024-03-15T10:30:00Z"
  }
]
```

### Get Report by ID

```http
GET /reports/:id
```

**Response:**

```json
{
  "id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "description": "Large pothole causing traffic issues",
  "category": "pothole",
  "status": "pending",
  "location": "12.9716, 77.5946",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/image.jpg",
  "createdAt": "2024-03-15T10:30:00Z",
  "updatedAt": "2024-03-15T10:30:00Z"
}
```

### Create New Report

```http
POST /reports
```

**Request Body:**

```json
{
  "description": "There is a large pothole on Main Street that's causing traffic problems",
  "location": "Main Street, Downtown",
  "category": "pothole",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/image.jpg"
}
```

**Required Fields:**

- `description`
- `location`
- `category` (should be obtained from /issues/classify endpoint)

**Optional Fields:**

- `imageUrl` (if you want to attach an image)

**Response:**

```json
{
  "id": "65f1a2b3c4d5e6f7g8h9i0j2",
  "description": "There is a large pothole on Main Street that's causing traffic problems",
  "category": "pothole",
  "status": "pending",
  "location": "Main Street, Downtown",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/image.jpg",
  "createdAt": "2024-03-15T11:00:00Z",
  "updatedAt": "2024-03-15T11:00:00Z"
}
```

### Update Report

```http
PUT /reports/:id
```

**Request Body:**

```json
{
  "status": "in-progress",
  "description": "Large pothole - Maintenance team assigned"
}
```

**Response:**

```json
{
  "id": "65f1a2b3c4d5e6f7g8h9i0j2",
  "description": "Large pothole - Maintenance team assigned",
  "category": "pothole",
  "status": "in-progress",
  "location": "Main Street, Downtown",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/image.jpg",
  "createdAt": "2024-03-15T11:00:00Z",
  "updatedAt": "2024-03-15T11:15:00Z"
}
```

### Delete Report

```http
DELETE /reports/:id
```

**Response:**

```json
{
  "message": "Report deleted successfully"
}
```

## Testing Examples

### Complete Flow Example:

1. **First, classify the issue:**

```json
POST /issues/classify
{
  "description": "Large pothole on Main Street causing damage to vehicles"
}
```

Response:

```json
{
  "category": "pothole",
  "confidence": 0.89
}
```

2. **Then create the report using the classified category:**

```json
POST /reports
{
  "description": "Large pothole on Main Street causing damage to vehicles",
  "location": "Main Street, Downtown",
  "category": "pothole",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/image.jpg"
}
```

### Sample Test Cases:

#### Case 1: Road Issue

```json
// 1. Classify
POST /issues/classify
{
  "description": "Large pothole on Main Street causing damage to vehicles"
}

// 2. Create Report
POST /reports
{
  "description": "Large pothole on Main Street causing damage to vehicles",
  "location": "Main Street, Downtown",
  "category": "pothole",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/pothole.jpg"
}
```

#### Case 2: Lighting Issue

```json
// 1. Classify
POST /issues/classify
{
  "description": "Street light not working for past 3 days on North Avenue"
}

// 2. Create Report
POST /reports
{
  "description": "Street light not working for past 3 days on North Avenue",
  "location": "North Avenue, Commercial District",
  "category": "fused streetlight",
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/streetlight.jpg"
}
```

### Sample Descriptions:

1. "Large pothole on Main Street causing damage to vehicles"
2. "Water leakage from underground pipeline near City Park"
3. "Street light not working for past 3 days on North Avenue"
4. "Garbage accumulation causing health hazards near market area"
5. "Broken sidewalk creating safety hazard for pedestrians"
6. "Sewage overflow in residential area needs immediate attention"

### Sample Locations:

1. "12.9716, 77.5946" (Example coordinates)
2. "Main Street, Downtown"
3. "City Park, West Area"
4. "North Avenue, Commercial District"
5. "Market Area, South Zone"

### Status Values:

- pending
- in-progress
- resolved

## Notes:

- Always classify the issue first using the /issues/classify endpoint
- Use the returned category when creating a new report
- Images can be uploaded to Cloudinary and the URL stored, but no image analysis is performed
- Required fields for creating a report: description, location, category
- Status defaults to "pending" when creating a new report
- The API uses Hugging Face's zero-shot classification to categorize issues based on descriptions
