document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        statusDiv.textContent = '';
        statusDiv.style.color = '';

        const formData = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            phone: form.phone.value,
            subject: form.subject.value,
            message: form.message.value,
            source: form.source.value,
            newsletter: form.newsletter.checked
        };

        try {
            // If newsletter subscription is checked, send to ConvertKit
            if (formData.newsletter) {
                const convertKitResponse = await axios.post(
                    'https://api.convertkit.com/v3/forms/7997859/subscribe',
                    {
                        api_key: 'u3grpKhM9zLWrA2tUHc0VA',
                        email: formData.email,
                        first_name: formData.firstName,
                        fields: {
                            last_name: formData.lastName,
                            phone: formData.phone,
                            source: formData.source,
                            message: formData.message
                        }
                    }
                );

                if (!convertKitResponse.data.subscription) {
                    throw new Error('Failed to subscribe to newsletter');
                }
            }

            // Send contact form data to your backend
            const contactResponse = await axios.post('/api/contact', formData);

            if (contactResponse.status !== 200) {
                throw new Error('Failed to send message');
            }

            // Show success message
            statusDiv.textContent = 'Thank you for your message! We will get back to you soon.';
            statusDiv.style.color = 'green';
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            statusDiv.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            statusDiv.style.color = 'red';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });

    // Add input validation
    const emailInput = form.querySelector('#email');
    emailInput.addEventListener('input', () => {
        if (!emailInput.validity.valid) {
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.setCustomValidity('');
        }
    });

    // Add phone number validation
    const phoneInput = form.querySelector('#phone');
    phoneInput.addEventListener('input', () => {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Please enter a valid phone number');
        } else {
            phoneInput.setCustomValidity('');
        }
    });
}); 