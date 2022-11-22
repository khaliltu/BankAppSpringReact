package tn.iit.bank.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Account;
import tn.iit.bank.services.AccountService;
import tn.iit.bank.services.ClientService;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/accounts")
public class AccountController {

	private final AccountService accountService;
	private final ClientService clientService;

	@GetMapping
	public List<Account> getAll() {
		return accountService.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Account> read(@PathVariable Long id) {
		Account account;
		try {
			account = accountService.getAccountById(id);
			return ResponseEntity.ok(account);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/owner/{cin}")
	public List<Account> getByClient(@PathVariable String cin) {
		return accountService.getByClientCin(cin);
	}

	@PostMapping
	public ResponseEntity<Account> create(@RequestBody Account account) {
		if (clientService.exist(account.getClient().getCin())) {
			Account newAccount = accountService.save(account);
			return ResponseEntity.ok(newAccount);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@PutMapping
	public ResponseEntity<Account> update(@RequestBody Account account) {
		var newAccount = new Account();
		if (accountService.exist(account.getRib())) {
			newAccount = accountService.save(account);
			return ResponseEntity.ok(newAccount);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping
	public ResponseEntity<Account> delete(@RequestBody Account account) {
		if (accountService.exist(account.getRib())) {
			accountService.delete(account.getRib());
			return ResponseEntity.ok(account);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
