from fastapi import APIRouter, HTTPException
from src.schemas.contact import ContactForm, ContactResponse
from src.services.email_service import email_service

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("/", response_model=ContactResponse)
async def send_contact_form(form: ContactForm):
    success = email_service.send_contact_form(
        name=form.name,
        email=form.email,
        message=form.message
    )

    if not success:
        raise HTTPException(
            status_code=500,
            detail="Failed to send message. Please try again later."
        )

    return ContactResponse(
        success=True,
        message="Message sent successfully"
    )
