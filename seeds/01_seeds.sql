
INSERT INTO users (id, name, email, password) VALUES (1, 'Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, name, email, password) VALUES (2, 'Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, name, email, password) VALUES (3, 'Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 1, 'Speed Lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61, 6, 4, 8, 'Canada', '536 Nansub Highway', 'Sotboske', 'Quebec',28142, true);
INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (2, 1, 'Blank Corner', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 85234, 6, 6, 7, 'Canada', '651 Nami Rd', 'Sotboske', 'Alberta', 83680, true);
INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (3, 2, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 46058, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Sotboske', 'Quebec', 44583, true);


INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES (1, '2018-09-11T08:00:00.000Z', '2018-09-26T08:00:00.000Z', 2, 3);
INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES (2, '2019-01-04T08:00:00.000Z', '2019-02-01T08:00:00.000Z', 2, 2);
INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES (3, '2023-10-01T08:00:00.000Z', '2023-10-14T08:00:00.000Z', 1, 3);


INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) VALUES (1, 3, 2, 1, 3, 'messages');
INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) VALUES (2, 2, 2, 2, 4, 'messages');
INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) VALUES (3, 3, 1, 3, 4, 'messages');



