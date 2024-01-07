CREATE TABLE `quiz` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`background` text,
	`avatar` text,
	`create_at` integer DEFAULT strftime('%s', 'now'),
	`author` integer,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variant` (
	`id` integer PRIMARY KEY NOT NULL,
	`variant_text` text NOT NULL,
	`is_rigth` integer DEFAULT false,
	`step_id` integer,
	FOREIGN KEY (`step_id`) REFERENCES `step`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`login` text NOT NULL,
	`password_hash` text NOT NULL,
	`create_at` integer DEFAULT strftime('%s', 'now')
);
--> statement-breakpoint
CREATE TABLE `step` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer NOT NULL,
	`question` text,
	`background` text,
	`quiz_id` integer NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_login_unique` ON `user` (`login`);