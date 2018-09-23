class ProjectEntity {
  constructor(id, name, description, budget, startTime) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.budget = budget || 0;
    this.startTime = startTime || 0;
  }
}
export default ProjectEntity;
