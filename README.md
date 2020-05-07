# tutorial-app

Admin details: <br />
**firstName: Lawal** <br />
**email: omodauda@yahoo.com** <br />
**password: babalola**

**Signup**
----
Register a user

* **URL**
    /signup
* **Method:**
    `POST`

* **URL Params**
    none
* **Data Body** <br />
    **Required:**
    `firstName = [string]`
    `email = [string]`
    `password = [string]`
    `role = [string] (default role = student) If registering as a tutor role = tutor`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{user registered successfully}`
* **Error Response:**
  * **code:** 404 NOT FOUND <br />
    **content:** `{ "All fields are required" or "You can't signup as an admin.}`


**Login**
----
Login a user

* **URL**
    /login
* **Method:**
    `POST`

* **URL Params**
    none
* **Data Params** <br />
    **Required:**
    `firstName = [string]`
    `email = [string]`
    `password = [string]`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{{"_id": "user id","token": "token"}}`
* **Error Response:**
  * **code:** 403 Forbidden <br />
    **content:** `("Incorrect username or password, please review details and try again" or "User Not found, Pls provide valid credentials.")`

**Create category**
----
Create a category

* **URL**
    /categories
* **Method:**
    `POST`

* **URL Body** <br />
    **Required:**
    `{"name": "subject name"}`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{"status":success, "result":3, "data:[]}`
* **Error Respons:**
  * **code:** 400 <br />
    **content:** `Unexpected token in JSON`


**Categories**
----
Retrieve all categories

* **URL**
    /categories
* **Method:**
    `GET`

* **URL Header** <br />
    **Required:**
    `Authorization: Bearer token`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{"status":success, "result":3, "data:[]}`
* **Error Response:**
  * **code:** 400 <br />
    **content:** `"Auth failed" or "Error: You don't have permission to perform this operation"`


**All Subjects by category**
----
Retrieve all subjects by category

* **URL**
    /categories/:categoryId/subjects
* **Method:**
    `GET`

* **URL Path variables** <br />
    **Required:**
    `category id: category id`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":1, "data":[]}`
* **Error Response:**
  * **code:** 400 <br />
    **content:** `("Auth failed", "No category with this id found.")`


**Update a category**
----
Update a category by id

* **URL**
    /categories/:id
* **Method:**
    `PATCH`

* **URL Param** <br />
    **Required:**
    `id: category id`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `"category deleted successfully"`


**Delete a category**
----
Delete a category by id

* **URL**
    /categories/:id
* **Method:**
    `DELETE`

* **URL Param** <br />
    **Required:**
    `id: category id`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `"category deleted successfully"`


**Retrieve a subject**
----
Retrieve a subject in a category by id

* **URL**
    /subjects/:id
* **Method:**
    `GET`

* **URL path variable** <br />
    **Required:**
    `id: subject id`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":1, "data":[]}`
* **Error Response:**
  * **code:** 400 <br />
    **content:** `("Auth failed" or "Invalid subject id provided")`


**Create subject**
----
Create a subject in a category

* **URL**
    /subjects
* **Method:**
    `POST`

* **URL Body** <br />
    **Required:**
    `{
        "name": "subject name",
        "category": "category id"
    }`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":1, "data": name, category}`
* **Error Response:**
    * **code:** 400 <br />
      **content:** `{"status": failed}`

**Update a subject in a category**
----
Update a subject in a category by id

* **URL**
    /subjects/:id
* **Method:**
    `PATCH`

* **URL Path variable** <br />
    **Required:**
    `{id: subject id}`
* **URL Body** <br />
    **Required:**
    `{name: new subject name}`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `"Successfuly updated subject"`
* **Error Response:**
    * **code:** 400 <br />
      **content:** `"failed to update subject, please check subject id"`

**Delete a subject**
----
Delete a subject in a category by id

* **URL**
    /subjects/:id
* **Method:**
    `DELETE`

* **URL Path variable** <br />
    **Required:**
    `{id: subject id}`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `"Subject deleted successfully"`
* **Error Response:**
    * **code:** 400 <br />
      **content:** `""`


**Search for subjects by name**
----
search for subjects by name

* **URL**
    /subjects/?q
* **Method:**
    `GET`

* **URL Param** <br />
    **Required:**
    `q : subject name`
* **Success Response:**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":1, "data":[]}`
* **Error Response:**
  * **code:** 400 <br />
    **content:** `("Auth failed" or "No subject found")`

**Retrieve tutors**
----
Retrieve all tutors

* **URL** <br />
    /tutors
* **Method:**
    `GET`

* **URL Param** <br />
    none
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "data":[]}`
* **Error Response**
    * **code:** 400 <br />
      **content:** `"Auth failed`

**Retrieve tutor by id**
----
Retrieve a tutor by id

* **URL** <br />
    /tutors/:id
* **Method:**
    `GET`

* **URL Path variable** <br />
    **Required:**
    `{id: tutor id}`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{role:"tutor", id: "integer", firstName:string, timestamps}`
* **Error Response**
    * **code:** 400 <br />
      **content:** `"Auth failed or []:no tutor matching id found/cross-check the tutor id supplied"`

**Deactivate a tutor**
----
Deactivate a tutor by id

* **URL** <br />
    /tutors/:id
* **Method:**
    `DELETE`

* **URL Path variable** <br />
    **Required:**
    `{id: tutor id}`
* **Success Response**
    * **code:** 200 <br />
      **content:** `"tutor deleted successfully"`
* **Error Response**
    * **code:** 400 <br />
      **content:** `"Auth failed","no tutor matching that id was found"`


**Register to take a subject**
----
Register to take a subject in a category. 
Note: Only tutors can register to take a subject
* **URL** <br />
    /tutors/registersubject
* **Method:**
    `POST`

* **URL Body** <br />
    **Required:**
    `{"tutor": "tutor id", "subject":"subject id"}`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "data":[]}`
* **Error Response**
    * **code:** 400 <br />
    **content:** `Unexpected token in JSON`


**Delete a registered subject**
----
Delete a registered subject. 
Note: tutors only
* **URL** <br />
    /tutors/registersubject/:id
* **Method:**
    `DELETE`

* **URL Params** <br />
    **Required:**
    `id: registeredsubject id}`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "data":[]}`
* **Error Response**
    * **code:** 400 <br />
    **content:** `Unmatch id provided`


**Book a lesson**
----
Book a lesson for a subject.
Note: only admin and student can book a lesson
* **URL** <br />
    /lessons
* **Method:**
    `POST`

* **URL Body: raw** <br />
    **Required:**
    `"user": "user id, "subject": "subject id""`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "data":[]}`
* **Error Response**
    * **code:** 400 <br />
    **content:** `Validation error`

**Retrieve all lessons**
----
Retrieve all lessons
Note: only admin can retrieve lessons
* **URL** <br />
    /lessons
* **Method:**
    `GET`

* **URL Params**
    none
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "data":[]}`
* **Error Response**
    * **code:** 400 <br />
      **content:** `Cannot GET route....`


**Retrieve lesson by id**
----
Retrieve a lesson by id
Note: only admin can retrieve a lesson
* **URL** <br />
    /lessons/:id
* **Method:**
    `GET`

* **URL Path variable**
    `id: lesson id`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "data":[]}`
* **Error Response**
    * **code:** 400 <br />
      **content:** `Cannot GET route....`


**Update lesson by id**
----
Update a lesson by id
Note: only admin can update a lesson
* **URL** <br />
    /lessons/:id
* **Method:**
    `PATCH`

* **URL Path variable**
    `id: lesson id`
* **URL Body**
    `subjectId: subject id`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"Successfully updated lesson`
* **Error Response**
    * **code:** 400 <br />
      **content:** `"failed to update lesson,please check lesson id"`


**Delete lesson by id**
----
Delete a lesson by id
Note: only admin can delete a lesson
* **URL** <br />
    /lessons/:id
* **Method:**
    `DELETE`

* **URL Path variable**
    `id: lesson id`
* **Success Response**
    * **code:** 200 <br />
      **content:** `{"status": success, "result":integer, "message" : "lesson deleted successfully"}`
* **Error Response**
    * **code:** 400 <br />
      **content:** `Cannot DELETE route....`

