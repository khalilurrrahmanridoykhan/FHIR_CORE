# Step 6: Create, read-back, delete (a write operation)

## Concept

So far we've only read (`GET`). Now let's learn to write:

```
POST /{resourceType}        -- create a new resource (the server assigns the id)
GET  /{resourceType}/{id}   -- read the created resource back to confirm
DELETE /{resourceType}/{id} -- clean up (courtesy on a test server)
```

The `POST` response gives back the created resource, including the server-assigned `id` -- remember it, because the next read/delete calls need it.

## Ground rules -- this is a real, shared public server

`hapi.fhir.org` is a community test server open to everyone -- no real person's data belongs here, and cleaning up test data afterward is good etiquette (just like your own project's README describes -- data was created under clearly-labeled "TEST"/"verification" names and fully deleted afterward).

## Task

In `exercise.mjs`:
1. Build a test `Patient` object (name it `"TEST - FHIR Learning"` so it's recognizable as test data)
2. Create it via `POST`, and pull the new `id` out of the response
3. `GET` it back using that `id`, and confirm the name is correct
4. `DELETE` it to clean up

## Connection to your own project

Your `dhis2-fhir-sync-console` README's "Live-verified against a real DHIS2 instance" section describes exactly this pattern -- creating test data, verifying it, and cleaning it up.
