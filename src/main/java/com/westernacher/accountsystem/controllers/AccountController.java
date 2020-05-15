package com.westernacher.accountsystem.controllers;

import com.westernacher.accountsystem.exceptions.AccountNotFoundException;
import com.westernacher.accountsystem.models.Account;
import com.westernacher.accountsystem.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static com.westernacher.accountsystem.utils.ExceptionUtils.ACCOUNT_NOT_FOUND;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/all")
    public Iterable<Account> getAll() {
        return accountRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        accountRepository.save(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(account);
    }

    @GetMapping("/{id}")
    public Account getAccount(@PathVariable String id) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (!optionalAccount.isPresent()) {
            throw new AccountNotFoundException(ACCOUNT_NOT_FOUND + id);
        }
        return optionalAccount.get();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> editAccount(@PathVariable String id, @RequestBody Account account) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (!optionalAccount.isPresent()) {
            throw new AccountNotFoundException(ACCOUNT_NOT_FOUND + id);
        }
        Account acc = optionalAccount.get();
        acc.setFirstName(account.getFirstName());
        acc.setLastName(account.getLastName());
        acc.setEmail(account.getEmail());
        acc.setDateOfBirth(account.getDateOfBirth());
        accountRepository.save(acc);
        return ResponseEntity.status(HttpStatus.OK).body(acc);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable String id) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (!optionalAccount.isPresent()) {
            throw new AccountNotFoundException(ACCOUNT_NOT_FOUND + id);
        }
        Account acc = optionalAccount.get();
        accountRepository.delete(acc);
        return ResponseEntity.status(HttpStatus.OK).body("Account with ID: " + id +" deleted!");
    }
}
