const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // avoid errors in cases where author does not have family or first name
  // return an empty string for this case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// Virtual for author lifespan
AuthorSchema.virtual("lifespan").get(function () {
  const formattedDateOfBirth = DateTime.fromJSDate(
    this.date_of_birth
  ).toLocaleString(DateTime.DATE_MED);

  let formattedDateOfDeath = "Present";
  if (this.date_of_death) {
    formattedDateOfDeath = DateTime.fromJSDate(
      this.date_of_death
    ).toLocaleString(DateTime.DATE_MED);
  }

  return `${formattedDateOfBirth} - ${formattedDateOfDeath}`;
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
