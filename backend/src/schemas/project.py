from datetime import datetime
from pydantic import BaseModel


class ProjectCreate(BaseModel):
    title: str
    description: str
    image_url: str | None = None
    github_url: str | None = None
    in_progress: bool = False
    is_featured: bool = False


class ProjectUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_url: str | None = None
    github_url: str | None = None
    in_progress: bool | None = None
    is_featured: bool | None = None


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: str | None
    github_url: str | None
    in_progress: bool
    is_featured: bool
    created_at: datetime

    model_config = {"from_attributes": True}
