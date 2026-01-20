from sqlalchemy.orm import Session
from sqlalchemy import select
from src.models.project import Project


class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Project]:
        query = select(Project)
        result = self.db.execute(query)
        return result.scalars().all()

    def get_by_id(self, id: int):
        query = select(Project).filter_by(id=id)
        result = self.db.execute(query)
        return result.scalars().first()

    def create(self,
               title: str,
               description: str,
               image_url: str | None = None,
               github_url: str | None = None,
               in_progress: bool = False,
               is_featured: bool = False) -> Project:
        project = Project(title=title,
                          description=description,
                          image_url=image_url,
                          github_url=github_url,
                          in_progress=in_progress,
                          is_featured=is_featured)
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def update(self,
               id: int,
               title: str | None = None,
               description: str | None = None,
               image_url: str | None = None,
               github_url: str | None = None,
               in_progress: bool | None = None,
               is_featured: bool | None = None):
        project = self.get_by_id(id)
        if not project:
            return None
        if title is not None:
            project.title = title
        if description is not None:
            project.description = description
        if image_url is not None:
            project.image_url = image_url
        if github_url is not None:
            project.github_url = github_url
        if in_progress is not None:
            project.in_progress = in_progress
        if is_featured is not None:
            project.is_featured = is_featured
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
