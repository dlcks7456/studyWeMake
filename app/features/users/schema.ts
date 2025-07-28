import {
	bigint,
	boolean,
	jsonb,
	pgEnum,
	pgSchema,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { ROLES } from "./constant";
import { products } from "../products/schema";
import { posts } from "../community/schema";
export const users = pgSchema("auth").table("users", {
	id: uuid().primaryKey(),
});

export const roles = pgEnum(
	"role",
	ROLES.map((role) => role.value) as [string, ...string[]],
);

export const notificationType = pgEnum("notification_type", [
	"follow",
	"review",
	"reply",
	"mention",
]);

export const profiles = pgTable("profiles", {
	profile_id: uuid()
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	avatar: text(),
	name: text().notNull(),
	username: text().notNull(),
	headline: text(),
	bio: text(),
	role: roles().default(ROLES[0].value).notNull(),
	stats: jsonb().$type<{
		followers: number;
		following: number;
	}>(),
	views: jsonb(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow(),
});

export const follows = pgTable("follows", {
	follower_id: uuid()
		.notNull()
		.references(() => profiles.profile_id, { onDelete: "cascade" }),
	following_id: uuid()
		.notNull()
		.references(() => profiles.profile_id, { onDelete: "cascade" }),
	created_at: timestamp().notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
	notification_id: bigint({ mode: "number" })
		.primaryKey()
		.generatedByDefaultAsIdentity(),
	source_id: uuid().references(() => profiles.profile_id, {
		onDelete: "cascade",
	}),
	product_id: bigint({ mode: "number" }).references(() => products.product_id, {
		onDelete: "cascade",
	}),
	post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
		onDelete: "cascade",
	}),
	target_id: uuid()
		.references(() => profiles.profile_id, {
			onDelete: "cascade",
		})
		.notNull(),
	seen: boolean().notNull().default(false),
	type: notificationType().notNull(),
	created_at: timestamp().notNull().defaultNow(),
});

export const messageRoom = pgTable("message_room", {
	message_room_id: bigint({ mode: "number" })
		.primaryKey()
		.generatedByDefaultAsIdentity(),
	created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable(
	"message_room_members",
	{
		message_room_id: bigint({ mode: "number" }).references(
			() => messageRoom.message_room_id,
			{
				onDelete: "cascade",
			},
		),
		profile_id: uuid().references(() => profiles.profile_id, {
			onDelete: "cascade",
		}),
		created_at: timestamp().notNull().defaultNow(),
	},
	(table) => [
		primaryKey({
			columns: [table.message_room_id, table.profile_id],
		}),
	],
);

export const messages = pgTable("messages", {
	message_id: bigint({ mode: "number" })
		.primaryKey()
		.generatedByDefaultAsIdentity(),
	message_room_id: bigint({ mode: "number" })
		.references(() => messageRoom.message_room_id, {
			onDelete: "cascade",
		})
		.notNull(),
	sender_id: uuid()
		.references(() => profiles.profile_id, {
			onDelete: "cascade",
		})
		.notNull(),
	content: text().notNull(),
	seen: boolean().notNull().default(false),
	created_at: timestamp().notNull().defaultNow(),
});
