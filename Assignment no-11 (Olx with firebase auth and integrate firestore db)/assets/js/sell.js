import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { auth, db } from "../../firebase/config.js";

// Current step tracking
let currentStep = 1;

// Category to subcategory mapping
const subcategories = {
    electronics: ["Mobile Phones", "Laptops", "TVs", "Cameras", "Accessories"],
    vehicles: ["Cars", "Motorcycles", "Bicycles", "Scooters", "Commercial Vehicles"],
    property: ["Houses", "Apartments", "Plots", "Commercial Property"],
    furniture: ["Sofas", "Beds", "Wardrobes", "Dining Tables", "Office Furniture"],
    fashion: ["Men's Clothing", "Women's Clothing", "Watches", "Jewelry", "Bags"],
    books: ["Textbooks", "Fiction", "Non-Fiction", "Magazines", "Hobby Items"],
    services: ["Tutors", "Repairs", "Events", "Health & Beauty", "Cleaning"]
};

// City to state mapping
const cities = {
    karachi: ["Gulshan-e-Iqbal", "DHA", "Nazimabad", "Landhi", "Malir"],
    punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Sialkot"],
    khyber_pakhtunkhwa: ["Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat"]
    // balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Chaman"]
};

// Initialize form
document.addEventListener('DOMContentLoaded', function () {
    // Category change event
    document.getElementById('category').addEventListener('change', function () {
        const category = this.value;
        const subcategorySelect = document.getElementById('subcategory');

        // Enable subcategory and populate options
        subcategorySelect.disabled = false;
        subcategorySelect.innerHTML = '<option value="" selected disabled>Select subcategory</option>';

        if (category && subcategories[category]) {
            subcategories[category].forEach(function (subcat) {
                const option = document.createElement('option');
                option.value = subcat.toLowerCase().replace(' ', '-');
                option.textContent = subcat;
                subcategorySelect.appendChild(option);
            });
        }

        // Show/hide brand field for electronics
        document.getElementById('brandField').style.display =
            (category === 'electronics') ? 'block' : 'none';
    });

    // State change event
    document.getElementById('state').addEventListener('change', function () {
        const state = this.value;
        const citySelect = document.getElementById('city');

        // Enable city and populate options
        citySelect.disabled = false;
        citySelect.innerHTML = '<option value="" selected disabled>Select city</option>';

        if (state && cities[state]) {
            cities[state].forEach(function (city) {
                const option = document.createElement('option');
                option.value = city.toLowerCase().replace(' ', '-');
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // Image upload box click event
    document.getElementById('imageUploadBox').addEventListener('click', function () {
        document.getElementById('imageUpload').click();
    });

    // Image upload change event
    document.getElementById('imageUpload').addEventListener('change', previewImages);

    // Navigation buttons
    document.getElementById('nextStep1').addEventListener('click', nextStep);
    document.getElementById('nextStep2').addEventListener('click', nextStep);
    document.getElementById('prevStep2').addEventListener('click', prevStep);
    document.getElementById('prevStep3').addEventListener('click', prevStep);

    // Form submission
    document.getElementById('sellForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all steps
        if (validateStep(1) && validateStep(2) && validateStep(3)) {

            const user = auth.currentUser;
            if (!user) {
                alert(" Please login first before submitting your ad post");
                return;
            }
            //GET THE VALUES FROM INDEX FILE.
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const category = document.getElementById("category").value;
            const subcategory = document.getElementById("subcategory").value;
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const price = document.getElementById("price").value;
            const brand = document.getElementById("brand").value;
            const phone = document.getElementById("phone").value;
            const provinces = document.getElementById("state").value;
            const condition = document.querySelector('input[name="condition"]:checked').value;

            const images = [];
            try {

                await addDoc(collection(db, "ads"), {
                    uid: user.uid,
                    name,
                    email,
                    category,
                    subcategory,
                    title,
                    description,
                    brand,
                    provinces,
                    price,
                    phone,
                    condition,
                    images,
                    createdAt: new Date().toUTCString()

                })

                alert("Your ad has been submitted successfully");
                e.target.reset();
                window.location.href = "../index.html";



            }
            catch (error) {
                console.log("Error saving ad:", error);
                alert("Something went to wrong, Please try again");
            }

        }
    });
});

// Next step function
function nextStep() {
    // Validate current step before proceeding
    if (validateStep(currentStep)) {
        document.getElementById('step' + currentStep).style.display = 'none';
        currentStep++;
        document.getElementById('step' + currentStep).style.display = 'block';
        updateStepIndicator();
    }
}

// Previous step function
function prevStep() {
    document.getElementById('step' + currentStep).style.display = 'none';
    currentStep--;
    document.getElementById('step' + currentStep).style.display = 'block';
    updateStepIndicator();
}

// Validate step function
function validateStep(step) {
    if (step === 1) {
        // Validate step 1 fields
        if (!document.getElementById('category').value) {
            alert('Please select a category');
            return false;
        }
        if (!document.getElementById('title').value) {
            alert('Please enter an ad title');
            return false;
        }
        if (!document.getElementById('description').value || document.getElementById('description').value.length < 30) {
            alert('Please enter a description with at least 30 characters');
            return false;
        }
        if (document.getElementById('imageUpload').files.length === 0) {
            alert('Please upload at least one image');
            return false;
        }
        if (!document.querySelector('input[name="condition"]:checked')) {
            alert('Please select the item condition');
            return false;
        }
    } else if (step === 2) {
        // Validate step 2 fields
        if (!document.getElementById('price').value) {
            alert('Please enter a price');
            return false;
        }
    }
    return true;
}

// Update step indicator
function updateStepIndicator() {
    const steps = document.querySelectorAll('.step');
    const progressBar = document.querySelector('.progress-bar');

    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');

        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });

    // Update progress bar
    progressBar.style.width = (currentStep * 33.33) + '%';
    progressBar.setAttribute('aria-valuenow', currentStep * 33.33);
}

// Preview uploaded images
function previewImages(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('imagePreviews');
    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.match('image.*')) continue;

        const reader = new FileReader();
        reader.onload = function (e) {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'preview-image-container';
            previewDiv.innerHTML = `
                <div class="preview-image-container" style="position: relative; display: inline-block;">
                    <img src="${e.target.result}" class="preview-image">
                    <span class="remove-image" data-index="${i}">×</span>
                </div>
            `;
            previewContainer.appendChild(previewDiv);

            // Add click event to remove button
            previewDiv.querySelector('.remove-image').addEventListener('click', function () {
                removeImage(parseInt(this.getAttribute('data-index')));
            });
        };
        reader.readAsDataURL(file);
    }
}

// Remove image from preview
function removeImage(index) {
    const input = document.getElementById('imageUpload');
    const files = Array.from(input.files);
    files.splice(index, 1);

    // Create new DataTransfer to update files
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    input.files = dataTransfer.files;

    // Re-render previews
    const event = { target: { files: input.files } };
    previewImages(event);
}


