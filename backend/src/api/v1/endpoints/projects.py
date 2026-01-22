from fastapi import APIRouter, HTTPException, Depends

from src.api.dependencies import get_project_service
from src.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
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
    return project


@router.post("/", response_model=ProjectResponse)
def create_project(data: ProjectCreate, service: ProjectService = Depends(get_project_service)):
    return service.create(data)


@router.put("/{id}", response_model=ProjectResponse)
def update_project(id: int, data: ProjectUpdate, service: ProjectService = Depends(get_project_service)):
    project = service.update(id, data)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.delete("/{id}", status_code=204)
def delete_project(id: int, service: ProjectService = Depends(get_project_service)):
    success = service.delete(id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return None
