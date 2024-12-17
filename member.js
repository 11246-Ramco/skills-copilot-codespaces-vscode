function skillsMember()
{
    // Create an object with a member function
    var o = {
        name: "object",
        skills: ["js", "html", "css"],
        showSkills: function() {
            // "this" in the showSkills function refers to the object "o"
            console.log(this.name + " knows " + this.skills);
        }
    };

    // Call the member function
    o.showSkills();
}
