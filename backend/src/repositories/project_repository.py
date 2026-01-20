from sqlalchemy.orm import Session
from sqlalchemy import select
from src.models.project import Project
from src.schemas.project import ProjectCreate, ProjectUpdate


class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Project]:
        query = select(Project)
        result = self.db.execute(query)
        return result.scalars().all()

    def get_by_id(self, id: int) -> Project | None:
        query = select(Project).filter_by(id=id)
        result = self.db.execute(query)
        return result.scalars().first()

    def create(self, data: ProjectCreate) -> Project:
        project = Project(**data.model_dump())
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def update(self, id: int, data: ProjectUpdate) -> Project | None:
        project = self.get_by_id(id)
        if not project:
            return None

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(project, field, value)

        self.db.commit()
        self.db.refresh(project)
        return project

    def delete(self, id: int) -> bool:
        project = self.get_by_id(id)
        if not project:
            return False
        self.db.delete(project)
        self.db.commit()
        return True
