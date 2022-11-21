package tn.iit.bank.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Account;
import tn.iit.bank.repositories.AccountRepository;

@RequiredArgsConstructor
@Service
public class AccountService {

	private final AccountRepository accountRepository;

	public Account save(Account account) {
		return accountRepository.save(account);
	}

	public Account getAccountById(Long id) throws Exception {
		return accountRepository.findById(id).orElseThrow(() -> new Exception("Account not found"));
	}

	public List<Account> getAll() {
		return accountRepository.findAll();
	}

	public boolean exist(Long id) {
		return accountRepository.existsById(id);
	}

	public void delete(Long id) {
		accountRepository.deleteById(id);
	}
}
