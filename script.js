document.addEventListener("DOMContentLoaded", function() {
    const friendCountElement = document.getElementById("friendCount");
    const friendInputsElement = document.getElementById("friendInputs");
    const resultElement = document.getElementById("result");
    let friendData = [];

    function generateRandomFriends() {
        const friendCount = Math.floor(Math.random() * 9) + 1;
        friendCountElement.textContent = `Number of Friends: ${friendCount}`;

        let html = '';
        for (let i = 0; i < friendCount; i++) {
            html += `
                <div>
                    <input type="text" placeholder="Friend ${i + 1}'s Name" id="name${i}">
                    <input type="number" placeholder="Friend ${i + 1}'s Age" id="age${i}">
                </div>
            `;
            friendData.push({ name: `name${i}`, age: `age${i}` });
        }
        friendInputsElement.innerHTML = html;
    }

    function calculateTotalAge() {
        if (!checkDataCompleteness()) {
            return;
        }
        let totalAge = 0;
        friendData.forEach(friend => {
            totalAge += parseInt(document.getElementById(friend.age).value);
        });
        return totalAge;
    }

    function calculateAverageAge() {
        if (!checkDataCompleteness()) {
            return;
        }
        let totalAge = calculateTotalAge();
        return totalAge / friendData.length;
    }

    function findYoungestFriend() {
        if (!checkDataCompleteness()) {
            return;
        }
        let minAge = Infinity;
        let youngestFriends = [];
        friendData.forEach(friend => {
            const age = parseInt(document.getElementById(friend.age).value);
            if (age < minAge) {
                minAge = age;
                youngestFriends = [{ name: document.getElementById(friend.name).value, age }];
            } else if (age === minAge) {
                youngestFriends.push({ name: document.getElementById(friend.name).value, age });
            }
        });
        return youngestFriends;
    }

    function findOldestFriend() {
        if (!checkDataCompleteness()) {
            return;
        }
        let maxAge = -Infinity;
        let oldestFriends = [];
        friendData.forEach(friend => {
            const age = parseInt(document.getElementById(friend.age).value);
            if (age > maxAge) {
                maxAge = age;
                oldestFriends = [{ name: document.getElementById(friend.name).value, age }];
            } else if (age === maxAge) {
                oldestFriends.push({ name: document.getElementById(friend.name).value, age });
            }
        });
        return oldestFriends;
    }

    function checkDataCompleteness() {
        for (let i = 0; i < friendData.length; i++) {
            const name = document.getElementById(friendData[i].name).value.trim();
            const age = document.getElementById(friendData[i].age).value.trim();
            if (name === '' || age === '') {
                alert(`Please enter both name and age for friend ${i + 1}.`);
                return false;
            }
        }
        return true;
    }

    function displayResults(result) {
        resultElement.textContent = result;
    }

    function resetPage() {
        friendData = [];
        friendInputsElement.innerHTML = '';
        resultElement.textContent = '';
        generateRandomFriends();
    }

    generateRandomFriends();

    document.getElementById("calculateTotalAgeBtn").addEventListener("click", function() {
        const totalAge = calculateTotalAge();
        if (totalAge !== undefined) {
            displayResults(`Total Age of Friends: ${totalAge}`);
        }
    });

    document.getElementById("calculateAverageAgeBtn").addEventListener("click", function() {
        const averageAge = calculateAverageAge();
        if (averageAge !== undefined) {
            displayResults(`Average Age of Friends: ${averageAge.toFixed(2)}`);
        }
    });

    document.getElementById("findYoungestFriendBtn").addEventListener("click", function() {
        const youngestFriends = findYoungestFriend();
        if (youngestFriends !== undefined) {
            const youngestFriendsString = youngestFriends.map(friend => `${friend.name} (Age: ${friend.age})`).join(', ');
            displayResults(`Youngest Friend(s): ${youngestFriendsString}`);
        }
    });

    document.getElementById("findOldestFriendBtn").addEventListener("click", function() {
        const oldestFriends = findOldestFriend();
        if (oldestFriends !== undefined) {
            const oldestFriendsString = oldestFriends.map(friend => `${friend.name} (Age: ${friend.age})`).join(', ');
            displayResults(`Oldest Friend(s): ${oldestFriendsString}`);
        }
    });

    document.getElementById("resetBtn").addEventListener("click", resetPage);
});
