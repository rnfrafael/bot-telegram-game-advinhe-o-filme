import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";
import { Context } from "grammy";

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
