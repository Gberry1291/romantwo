from django.shortcuts import render,redirect
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail

from .forms import ContactForm


def home(request):
    return render(request, "core/home.html")


def about(request):
    return render(request, "core/about.html")


def services(request):
    return render(request, "core/services.html")


def contact(request):
    return render(request, "core/contact.html")

def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)

        if form.is_valid():
            name = form.cleaned_data["name"]
            email = form.cleaned_data["email"]
            subject = form.cleaned_data["subject"]
            message = form.cleaned_data["message"]

            email_subject = f"Kontaktformular: {subject}"

            email_body = f"""
                Neue Nachricht über das Kontaktformular:

                Name:
                {name}

                E-Mail:
                {email}

                Betreff:
                {subject}

                Nachricht:
                {message}
                """

            send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )
            

            messages.success(request, "Vielen Dank. Ihre Nachricht wurde gesendet.")
            return redirect("core:contact")

    else:
        form = ContactForm()
# recipient_list=[settings.CONTACT_EMAIL],
    return render(request, "core/contact.html", {"form": form})