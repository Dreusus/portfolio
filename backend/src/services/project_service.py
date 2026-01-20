from src.schemas.project import ProjectCreate, ProjectUpdate
from src.repositories.project_repository import ProjectRepository
from src.models.project import Project


class ProjectService:
    def __init__(self, project_repo: ProjectRepository):
        self.project_repo = project_repo

    def get_all(self) -> list[Project]:
        return self.project_repo.get_all()

    def get_by_id(self, id: int) -> Project | None:
        return self.project_repo.get_by_id(id)

    def create(self, data: ProjectCreate) -> Project:
        return self.project_repo.create(data)

    def update(self, id: int, data: ProjectUpdate) -> Project | None:
        return self.project_repo.update(id, data)

    def delete(self, id: int) -> bool:
        return self.project_repo.delete(id)
