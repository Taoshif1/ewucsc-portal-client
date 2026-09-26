# Future EWUCSC Forms → MongoDB → CSV

The portal now has a generic public form-submission endpoint. A future HTML form does **not** need its own database collection or CSV code.

## Endpoint

Choose a stable lowercase form key, for example:

```text
membership-2026
workshop-registration
event-feedback
```

Submit to:

```http
POST /api/forms/<form-key>
Content-Type: application/json
```

Body:

```json
{
  "source": "membership-form",
  "data": {
    "Student ID": "2026-1-60-001",
    "Name": "Example Student",
    "Department": "CSE",
    "Phone": "01XXXXXXXXX"
  }
}
```

The backend stores the field names dynamically. New future forms can have different fields without changing the CSV exporter.

## Plain HTML example

When the complete `ewucsc_form.html` is supplied, its existing fields can be collected with `FormData` and submitted like this:

```html
<script>
const API_URL = "https://ewucsc-portal-server.vercel.app/api";

document.querySelector("#your-form-id").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch(API_URL + "/forms/membership-2026", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: window.location.href,
      data
    })
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  form.reset();
});
</script>
```

Do not paste this blindly until the final form's actual ID and field names are known.

## Admin CSV export

Approved Admin users can open:

```text
Dashboard → Form Data
```

Every detected form key appears with its submission count and an **Export CSV** button.

The CSV automatically contains:

- `submittedAt`
- every field name ever received for that form key

If an older submission did not contain a newer field, that cell remains blank.

## Student/member export

The existing **Manage Users → Export** button remains the CSV export for registered portal accounts.

So there are two separate datasets:

1. **Portal Members** → Manage Users CSV
2. **Any Future Public Form** → Form Data CSV
