from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=120,
        label="Ihr Name",
        widget=forms.TextInput(attrs={"class": "contact-input"}),
    )

    email = forms.EmailField(
        label="E-Mail Adresse",
        widget=forms.EmailInput(attrs={"class": "contact-input"}),
    )

    subject = forms.CharField(
        max_length=180,
        label="Betreff",
        widget=forms.TextInput(attrs={"class": "contact-input"}),
    )

    message = forms.CharField(
        label="Nachricht",
        widget=forms.Textarea(attrs={"class": "contact-input", "rows": 8}),
    )