from fastapi import APIRouter, HTTPException, Depends

from src.api.dependencies import get_project_service
from src.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from src.services.project_service import ProjectService

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/", response_model=list[ProjectResponse])
def get_all_project(service: ProjectService = Depends(get_project_service)):
    return service.get_all()


@router.get("/{id}", response_model=ProjectResponse)
def get_project(id: int, service: ProjectService = Depends(get_project_service)):
    project = service.get_by_id(id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
