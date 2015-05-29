![I ♥ BBQ](/docs/logos/vertical-logo-small.png)

## General Assembly WDI Project 3
### Group Pikachu

This app is a BBQ planning app for NYC. City-wide bbq locations are displayed on a map of NYC. A BBQ planner can select a location and set a date, time for an event. Once the event is created a user can invite their friends via email. All event invitees can access the event details, and RSVP to the event.


#ERD
![I ♥ BBQ Entity Relationship Diagram](/docs/BBQ-NYC-ERD.png)

#Wireframes
![I ♥ BBQ Wireframe](/docs/wireframes/Homepage.png)
![I ♥ BBQ Wireframe](/docs/wireframes/Homepage_Park_Info_Modal.png)
![I ♥ BBQ Wireframe](/docs/wireframes/Event_Details.png)
![I ♥ BBQ Wireframe](/docs/wireframes/Create_Event.png)
![I ♥ BBQ Wireframe](/docs/wireframes/Event_Detail_Photos.png)
![I ♥ BBQ Wireframe](/docs/wireframes/Login.png)


#Routes
| Prefix                               | verb    | URI pattern                             | Controller#Action |
|--------------------------------------|---------|-----------------------------------------|-------------------|
| root                                 | GET     | /                                       | welcome#index     |
| login                                | GET     | /login                                  | sessions#new      |
| logout                               | GET     | /logout                                 | sessions#destroy  |
| name_yo_self                         | GET     | /name-yo-self                           | users#name        |
| api_users                            | GET     | /api/users                              | api/users#index   |
|                                      | POST    | /api/users                              | api/users#create  |
| new_api_user                         | GET     | /api/users/new                          | api/users#new     |
| edit_api_user                        | GET     | /api/users/:id/edit                     | api/users#edit    |
| api_user                             | GET     | /api/users/:id                          |                   |
| api/users#show                       | PATCH   | /api/users/:id                          |                   |
| api/users#update                     | PUT     | /api/users/:id                          | api/users#update  |
| api/users#update                     | GET     | /api/locations                          |                   |
| api_locations                        | GET     | /api/locations                          |                   |
| api/locations                        | GET     | /api/locations/:id                      |                   |
| api/rsvps#index                      | POST    | /api/events/:event_id/rsvps             |                   |
| api/rsvps#create                     | GET     | /api/events/:event_id/rsvps/new         |                   |
| api/rsvps#new,edit_api_event_rsvp    | GET     | /api/events/:event_id/rsvps/:id/edit    |                   |
| api/rsvps#edit,api_event_rsvp        | GET     | /api/events/:event_id/rsvps/:id         | /api/rsvps#show   |
| api/rsvps#show                       | PATCH   | /api/events/:event_id/rsvps/:id         |                   |
| api/rsvps#update                     | PUT     | /api/events/:event_id/rsvps/:id         |                   |
| api/rsvps#update,api_event_supplies  | GET     | /api/events/:event_id/supplies          |                   |
| api/supplies#index                   | POST    | /api/events/:event_id/supplies          |                   |
| api/supplies#create                  | GET     | /api/events/:event_id/supplies/new      |                   |
| api/supplies#new                     | GET     | /api/events/:event_id/supplies/:id/edit |                   |
| api/supplies#edit                    | GET     | /api/events/:event_id/supplies/:id      |                   |
| api/supplies#show                    | PATCH   | /api/events/:event_id/supplies/:id      |                   |
| api/supplies#update                  | PUT     | /api/events/:event_id/supplies/:id      |                   |
| api/supplies#update                  | DELETE  | /api/events/:event_id/supplies/:id      |                   |
| api/supplies#destroy                 | GET     | /api/events                             |                   |
| api/events#index                     | POST    | /api/events                             |                   |
| api/events#create                    | GET     | /api/events/new                         |                   |
| api/events#new                       | GET     | /api/events/:id/edit                    |                   |
| api/events#edit                      | GET     | /api/events/:id                         |                   |
| api/events#show                      | PATCH   | /api/events/:id                         |                   |
| api/events#update                    | PUT     | /api/events/:id                         |                   |
| api/events#update                    | POST    | /sessions                               |                   |
| sessions#create                      | GET     | /sessions/new                           |                   |
| sessions#new                         | GET     | /sessions/edit                          |                   |
| sessions#edit                        | GET     | /sessions                               |                   |
| sessions#destroy                     | DELETE  | /sessions                               |                   |

#Libraries

- Ruby on Rails
- jQuery
- jQuery UI
- Foundation CSS
- Snazzy Maps
- Google Maps
- SendGrid
