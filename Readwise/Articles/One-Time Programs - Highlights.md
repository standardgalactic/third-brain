![rw-book-cover](https://news.ycombinator.com/favicon.ico)

## Metadata
- Author: [[Matthew Green]]
- Full Title: One-Time Programs
- URL: https://blog.cryptographyengineering.com/2022/10/27/one-time-programs/

## Highlights
- Our work is about realizing a cryptographic primitive called the *One-Time Program* (OTP). This is a specific kind of cryptographically [obfuscated](https://blog.cryptographyengineering.com/2014/02/21/cryptographic-obfuscation-and/) computer program — that is, a program that is “encrypted” but that you can mail (literally) to someone who can run it on any untrusted computer, using input that the executing party provides. This ability to send “secure, unhackable” software to people is all by itself of a holy grail of cryptography, since it would solve so many problems both theoretical and practical. One-time programs extend these ideas with a specific property that is foreshadowed by the name: *the executing computer can only run a OTP once*. ([View Highlight](https://read.readwise.io/read/01h00djgeg4wgrdg216wqb60vc))
- One-Time Programs (OTPs) were first proposed by [Goldwasser, Kalai and Rothblum](https://www.microsoft.com/en-us/research/publication/one-time-programs-2/) (GKR) back in CRYPTO 2008. At a surface level, the idea is quite simple. Let’s imagine that Alice has some (secret) computer program **P** that takes in some inputs, cogitates for a bit, and then produces an output. Alice wishes to mail a copy of **P** to her untrustworthy friend Bob who will then be able to run it. However Alice (and Bob) have a few very strict requirements: ([View Highlight](https://read.readwise.io/read/01h00faa0qpsy1a7yyc6d8jx32))
- • Bob can run the program on *any input* he wants, and he will get a correct output.
  • Bob won’t learn anything about the program beyond what he learns from the output (except, perhaps, an upper-bound on its size/runtime.)
  • Bob can run the program exactly once. ([View Highlight](https://read.readwise.io/read/01h00fagdx9wt5pw2f9cehmb5k))
- Let’s use a very specific example to demonstrate how these programs might work. Imagine that Alice wants to email Bob a document encrypted under a relatively weak password such as a 4-digit PIN. If Alice employed a traditional [password-based encryption scheme](https://en.wikipedia.org/wiki/Password-based_cryptography), this would be a very bad idea! Bob (or anyone else who intercepts the message before it reaches Bob) could attempt to decrypt the document by systematically testing each of the (10,000) different passwords until one worked correctly. ([View Highlight](https://read.readwise.io/read/01h00fak59efb3799jq03gxpdv))
- Using a one-time program, however, Alice can write a program with code that looks like this, and turn it into an OTP:
  1234
  `Program P: takes an argument "password"``1. if password != "<secret password>",``output "BAD"``2. else output <secret document>` ([View Highlight](https://read.readwise.io/read/01h00faqhv2r2bndacesa4htbm))
- When Bob receives an OTP of the program above, he can then run it on some password input he chooses — even if Alice is no longer around to help him. More critically, because it’s a *one-time* program, Bob will only be able to try a single password guess. Assuming Bob *knows* the right password this is just fine. But a recipient who does not know the password will have to guess it correctly the first time. The nice implication is that even a “weak” 4-digit PIN reasonably to safe to use as a password. ([View Highlight](https://read.readwise.io/read/01h00fasmzc17jwvhp451mhj1f))
